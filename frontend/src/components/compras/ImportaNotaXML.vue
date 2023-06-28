<template>
  <b-container fluid class="import-xml-manual">
    <b-row class="container-import-xml">
      <b-col cols="12" align="center" class="mt-4 border p-2">
        <h4>Importar XML manualmente</h4>
        <b-form-group
          description="Importe as notas fiscais recebidas dos seus fornecedores para dar entrada nas mercadorias e no financeiro, faça a importação clicando no botão 'Browse ou Selecionar arquivo XML."
        ></b-form-group>
      </b-col>
      <b-col cols="12" md="9" lg="7" class="mb-4 mt-2">
        <b-form-file
          type="file"
          multiple
          v-model="arquivosXmlCompra"
          :file-name-formatter="formatNameArquivosInput"
          placeholder="Selecione um arquivo XML..."
        ></b-form-file>
      </b-col>
      <!-- BOTÃO DE IMPORTAR -->
      <b-col sm="12" class="btn-compra-importa-cancelar">
        <b-button variant="btn btn-success" @click="parseNovaNotaXML()">
          <i class="fa fa-cloud-upload fa-lg"></i> Importar
        </b-button>
      </b-col>
    </b-row>
    <!-- CONTAINER COM INFORMAÇÕS DAS NOTAS IMPORTADAS OU ERRO NA IMPORTAÇÃO -->
    <b-row
      class="mt-3"
      v-if="msgNotasImportadaErro !== null || msgNotasSucesso !== null"
    >
      <b-col cols="12" md="6" align="center" class="border p-2">
        <h5 class="text-success border p-1">Notas NF-e importadas.</h5>
        <b-row
          class="border m-0 p-2 mt-1"
          v-for="(nota, k) in msgNotasSucesso"
          :key="k"
        >
          <b-col cols="12">
            {{ nota }}
          </b-col>
          <b-col class="text-success" cols="12"> Importada com sucesso! </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" md="6" align="center" class="border p-2">
        <h5 class="text-danger border p-1">Notas NF-e não importadas.</h5>
        <b-row
          class="border m-0 p-2 mt-1"
          v-for="(nota, k) in msgNotasImportadaErro"
          :key="k"
        >
          <b-col cols="12">
            {{ nota.chave }}
          </b-col>
          <b-col class="text-danger" cols="12">
            {{ nota.error }}
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { baseApiUrl, showError } from "@/../global";
import axios from "axios";

export default {
  name: "ImportaNotaXML",
  props: ["mode"],
  data() {
    return {
      arquivosXmlCompra: [],
      msgNotasImportadaErro: null,
      msgNotasSucesso: null,
    };
  },
  methods: {
    formatNameArquivosInput(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} arquivos selecionados.`;
    },
    parseNovaNotaXML() {
      /* LIMPA AS VARIAVEIS */
      this.msgNotasImportadaErro = null;
      this.msgNotasSucesso = null;

      let msgNotasImportadaErroMod = [];
      let msgNotasSucessoMod = [];
      let file = this.arquivosXmlCompra;
      let indexDo = 0;
      const idFuncionario =
        this.$store.state.tokenFuncionario.codigo_funcionario; // SETA ID DO FUNCIONARIO
      // toda leitura da nota para a importação
      do {
        let fr = new FileReader();

        if (
          file[indexDo] !== null &&
          file[indexDo] !== undefined &&
          file[indexDo].type == "text/xml"
        ) {
          try {
            fr.readAsBinaryString(file[indexDo]);
            fr.onload = function (e) {
              this.modeloNovaNotaXML = {}; // instancia o array q sera enviado para o sevidor
              this.modeloNovaNotaXML.funcionario = idFuncionario; // SETA ID DO FUNCIONARIO
              const notaXML = e.currentTarget.result;
              let parser = new DOMParser();
              let xmlDoc = parser.parseFromString(notaXML, "text/xml"); // guarda o xml completo

              const nfeNoPai_ide = xmlDoc.getElementsByTagName("ide"); // identificação
              for (let i = 0; i < nfeNoPai_ide.length; i++) {
                var modeloIde = {};
                let noFilhos_ide = nfeNoPai_ide[i].childNodes; // pega nos os filhos de ide [cuf, cnf, natop, indpag...]

                for (let i = 0; i < noFilhos_ide.length; i++) {
                  switch (noFilhos_ide[i].tagName) {
                    case "cUF":
                      modeloIde.ide_cuf = noFilhos_ide[i].textContent;

                      break;
                    case "cNF":
                      modeloIde.ide_cnf = noFilhos_ide[i].textContent;

                      break;
                    case "natOp":
                      modeloIde.ide_natope = noFilhos_ide[i].textContent;

                      break;
                    case "indPag":
                      modeloIde.ide_indpag = noFilhos_ide[i].textContent;

                      break;
                    case "mod":
                      modeloIde.ide_mod = noFilhos_ide[i].textContent;

                      break;
                    case "serie":
                      modeloIde.ide_serie = noFilhos_ide[i].textContent;

                      break;
                    case "nNF":
                      modeloIde.ide_nnf = noFilhos_ide[i].textContent;

                      break;
                    case "dhEmi":
                      modeloIde.ide_dhemi = noFilhos_ide[i].textContent;

                      break;
                    case "dhSaiEnt":
                      modeloIde.ide_dhsaient = noFilhos_ide[i].textContent;

                      break;
                    case "tpNF":
                      modeloIde.ide_tpnf = noFilhos_ide[i].textContent;

                      break;
                    case "idDest":
                      modeloIde.ide_iddest = noFilhos_ide[i].textContent;

                      break;
                    case "cMunFG":
                      modeloIde.ide_cmunfg = noFilhos_ide[i].textContent;

                      break;
                    case "NFRef":
                      modeloIde.ide_nfref = noFilhos_ide[i].textContent;

                      break;
                    case "tpImp":
                      modeloIde.ide_tpimp = noFilhos_ide[i].textContent;

                      break;
                    case "tpEmis":
                      modeloIde.ide_tpemis = noFilhos_ide[i].textContent;

                      break;
                    case "cDV":
                      modeloIde.ide_cdv = noFilhos_ide[i].textContent;

                      break;
                    case "tpAmb":
                      modeloIde.ide_tpamb = noFilhos_ide[i].textContent;

                      break;
                    case "finNFe":
                      modeloIde.ide_finnfe = noFilhos_ide[i].textContent;

                      break;
                    case "indFinal":
                      modeloIde.ide_indfinal = noFilhos_ide[i].textContent;

                      break;
                    case "indPres":
                      modeloIde.ide_indpres = noFilhos_ide[i].textContent;

                      break;
                    case "procEmi":
                      modeloIde.ide_procemi = noFilhos_ide[i].textContent;

                      break;
                    case "verProc":
                      modeloIde.ide_verproc = noFilhos_ide[i].textContent;

                      break;
                    case "dhCont":
                      modeloIde.ide_dhcont = noFilhos_ide[i].textContent;

                      break;
                    case "xJust":
                      modeloIde.ide_xjust = noFilhos_ide[i].textContent;

                      break;

                    default:
                      break;
                  }
                }
                this.modeloNovaNotaXML.ide = modeloIde;
              }
              modeloIde = null; // limpa o modelo ide

              const nfeNoPai_emit = xmlDoc.getElementsByTagName("emit"); // emitente
              for (let i = 0; i < nfeNoPai_emit.length; i++) {
                var modeloEmit = {};
                let noFilhos_emit = nfeNoPai_emit[i].childNodes; // pega os nos filhos de emit (cnpj, xnome, enderemit...)

                for (let i = 0; i < noFilhos_emit.length; i++) {
                  switch (noFilhos_emit[i].tagName) {
                    case "CNPJ":
                      modeloEmit.emit_cnpj = noFilhos_emit[i].textContent;

                      break;
                    case "CPF":
                      modeloEmit.emit_cpf = noFilhos_emit[i].textContent;

                      break;
                    case "xNome":
                      modeloEmit.emit_xnome = noFilhos_emit[i].textContent;
                      modeloEmit.emit_xfant = noFilhos_emit[i].textContent;
                      break;
                    case "xFant":
                      modeloEmit.emit_xfant = noFilhos_emit[i].textContent;

                      break;
                    case "enderEmit":
                      var nosFilhosEnderEmit = noFilhos_emit[i].childNodes; // pega os nos filhos de enderEmit [xlgr, nro, xbairro, cmun...]

                      for (let i = 0; i < nosFilhosEnderEmit.length; i++) {
                        switch (nosFilhosEnderEmit[i].tagName) {
                          case "xLgr":
                            modeloEmit.emit_xlgr =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "nro":
                            modeloEmit.emit_nro =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "xCpl":
                            modeloEmit.emit_xcpl =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "xBairro":
                            modeloEmit.emit_xbairro =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "cMun":
                            modeloEmit.emit_cmun =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "xMun":
                            modeloEmit.emit_xmun =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "UF":
                            modeloEmit.emit_uf =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "CEP":
                            modeloEmit.emit_cep =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "cPais":
                            modeloEmit.emit_cpais =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "xPais":
                            modeloEmit.emit_xpais =
                              nosFilhosEnderEmit[i].textContent;

                            break;
                          case "fone":
                            modeloEmit.emit_fone =
                              nosFilhosEnderEmit[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }

                      break;
                    case "IE":
                      modeloEmit.emit_ie = noFilhos_emit[i].textContent;

                      break;
                    case "IEST":
                      modeloEmit.emit_iest = noFilhos_emit[i].textContent;

                      break;
                    case "IM":
                      modeloEmit.emit_im = noFilhos_emit[i].textContent;

                      break;
                    case "CNAE":
                      modeloEmit.emit_cnae = noFilhos_emit[i].textContent;

                      break;
                    case "CRT":
                      modeloEmit.emit_crt = noFilhos_emit[i].textContent;

                      break;

                    default:
                      break;
                  }
                }
                this.modeloNovaNotaXML.emit = modeloEmit;
              }
              modeloEmit = null; // limpa o medelo emit

              const nfeNoPai_dest = xmlDoc.getElementsByTagName("dest"); // destinario
              for (let i = 0; i < nfeNoPai_dest.length; i++) {
                var modeloDest = {};
                let noFilhos_dest = nfeNoPai_dest[i].childNodes; // pega os nos filhos de dest [cnpj, xnome, enderedest...]

                for (let i = 0; i < noFilhos_dest.length; i++) {
                  switch (noFilhos_dest[i].tagName) {
                    case "CNPJ":
                      modeloDest.dest_cnpj = noFilhos_dest[i].textContent;

                      break;
                    case "CPF":
                      modeloDest.dest_cpf = noFilhos_dest[i].textContent;

                      break;
                    case "idEstrangeiro":
                      modeloDest.dest_idestrangeiro =
                        noFilhos_dest[i].textContent;

                      break;
                    case "xNome":
                      modeloDest.dest_xnome = noFilhos_dest[i].textContent;

                      break;
                    case "enderDest":
                      var nosFilhosEnderDest = noFilhos_dest[i].childNodes; // pega os nos filhos de enderDest [xlgr, nro, xCpl...]
                      for (let i = 0; i < nosFilhosEnderDest.length; i++) {
                        switch (nosFilhosEnderDest[i].tagName) {
                          case "xLgr":
                            modeloDest.dest_xlgr =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "nro":
                            modeloDest.dest_nro =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "xCpl":
                            modeloDest.dest_xcpl =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "xBairro":
                            modeloDest.dest_xbairro =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "cMun":
                            modeloDest.dest_cmun =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "xMun":
                            modeloDest.dest_xmun =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "UF":
                            modeloDest.dest_uf =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "CEP":
                            modeloDest.dest_cep =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "cPais":
                            modeloDest.dest_cpais =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "xPais":
                            modeloDest.dest_xpais =
                              nosFilhosEnderDest[i].textContent;

                            break;
                          case "fone":
                            modeloDest.dest_fone =
                              nosFilhosEnderDest[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }
                      break;
                    case "indIEDest":
                      modeloDest.dest_indiedest = noFilhos_dest[i].textContent;

                      break;
                    case "IE":
                      modeloDest.dest_ie = noFilhos_dest[i].textContent;

                      break;
                    case "ISUF":
                      modeloDest.dest_isuf = noFilhos_dest[i].textContent;

                      break;
                    case "IM":
                      modeloDest.dest_im = noFilhos_dest[i].textContent;

                      break;
                    case "CRT":
                      modeloDest.dest_email = noFilhos_dest[i].textContent;

                      break;
                    case "email":
                      modeloDest.dest_email = noFilhos_dest[i].textContent;

                      break;
                    case "Email":
                      modeloDest.dest_email = noFilhos_dest[i].textContent;

                      break;

                    default:
                      break;
                  }
                }
                this.modeloNovaNotaXML.dest = modeloDest;
              }
              modeloDest = null; // limpa o medelo dest

              const nfeNoPai_det = xmlDoc.getElementsByTagName("det"); // produtos
              this.modeloNovaNotaXML.det_produtos = []; // criar um array para guarda os produtos
              for (let i = 0; i < nfeNoPai_det.length; i++) {
                let noFilhos_det = nfeNoPai_det[i].childNodes; // pega os nos filhos de det [prod, imposto, infadprod...]
                let numItemNota = nfeNoPai_det[i].attributes.nItem.nodeValue; // numero do item na nota xml

                for (let i = 0; i < noFilhos_det.length; i++) {
                  switch (noFilhos_det[i].tagName) {
                    case "prod":
                      var nosFilhosProdProd = noFilhos_det[i].childNodes; // pego os nos filhos de prod [cprod, cean, xprod, ncm...]
                      var modeloProduto = {}; // crio um modelo para o produto

                      for (let i = 0; i < nosFilhosProdProd.length; i++) {
                        modeloProduto.num_item_nota = numItemNota; // numero do item ordenado na nota xml
                        switch (nosFilhosProdProd[i].tagName) {
                          case "cProd":
                            modeloProduto.det_prod_cprod =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "cEAN":
                            modeloProduto.det_prod_cean =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "xProd":
                            modeloProduto.det_prod_xprod =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "NCM":
                            modeloProduto.det_prod_ncm =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "NVE":
                            modeloProduto.det_prod_nve =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "CEST":
                            modeloProduto.det_prod_cest =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "indEscala":
                            modeloProduto.det_prod_indescala =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "CNPJFab":
                            modeloProduto.det_prod_cnpjfab =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "cBenef":
                            modeloProduto.det_prod_cbenef =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "EXTIPI":
                            modeloProduto.det_prod_extipi =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "CFOP":
                            modeloProduto.det_prod_cfop =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "uCom":
                            modeloProduto.det_prod_ucom =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "qCom":
                            modeloProduto.det_prod_qcom =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vUnCom":
                            modeloProduto.det_prod_vuncom =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vProd":
                            modeloProduto.det_prod_vprod =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "cEANTrib":
                            modeloProduto.det_prod_ceantrib =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "uTrib":
                            modeloProduto.det_prod_utrib =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "qTrib":
                            modeloProduto.det_prod_qtrib =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vUnTrib":
                            modeloProduto.det_prod_vuntrib =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vFrete":
                            modeloProduto.det_prod_vfrete =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vSeg":
                            modeloProduto.det_prod_vseg =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vDesc":
                            modeloProduto.det_prod_vdesc =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "vOutro":
                            modeloProduto.det_prod_voutro =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "indTot":
                            modeloProduto.det_prod_indtot =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "DI":
                            modeloProduto.det_prod_di =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "detExport":
                            modeloProduto.det_prod_detExport =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "xPed":
                            modeloProduto.det_prod_xped =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "nItemPed":
                            modeloProduto.det_prod_nitemped =
                              nosFilhosProdProd[i].textContent;

                            break;
                          case "nFCI":
                            modeloProduto.det_prod_nfci =
                              nosFilhosProdProd[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }

                      break;
                    case "imposto":
                      var nosFilhosProdImposto = noFilhos_det[i].childNodes; // pego os nos filhos de imposto [icms, pis, cofins...]

                      for (let i = 0; i < nosFilhosProdImposto.length; i++) {
                        switch (nosFilhosProdImposto[i].tagName) {
                          case "vTotTrib":
                            modeloProduto.det_imposto_vtotTrib =
                              nosFilhosProdImposto[i].textContent;

                            break;
                          case "ICMS":
                            var nosFilhosICMS =
                              nosFilhosProdImposto[i].childNodes[0].childNodes; // pega o no ICMS dps pega os filhos dele (orig, CST,piCMS...)

                            for (let i = 0; i < nosFilhosICMS.length; i++) {
                              switch (nosFilhosICMS[i].tagName) {
                                case "orig":
                                  modeloProduto.det_imposto_icms_orig =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "CST":
                                  modeloProduto.det_imposto_icms_cst =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vBCSTRet":
                                  modeloProduto.det_imposto_icms_vbcstret =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pST":
                                  modeloProduto.det_imposto_icms_pst =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vICMSSubstituto":
                                  modeloProduto.det_imposto_icms_vicmssubstituto =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vICMSSTRet":
                                  modeloProduto.det_imposto_icms_vicmsstret =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vBCFCPSTRet":
                                  modeloProduto.det_imposto_icms_vbcfcpstret =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pFCPSTRet":
                                  modeloProduto.det_imposto_icms_pfcpstret =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vFCPSTRet":
                                  modeloProduto.det_imposto_icms_vfcpstRet =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pRedBCEfet":
                                  modeloProduto.det_imposto_icms_predbcefet =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vBCEfet":
                                  modeloProduto.det_imposto_icms_vbcefet =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pICMSEfet":
                                  modeloProduto.det_imposto_icms_picmsefet =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vICMSEfet":
                                  modeloProduto.det_imposto_icms_vicmsefet =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vBCSTDest":
                                  modeloProduto.det_imposto_icms_vbcstdest =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vICMSSTDest":
                                  modeloProduto.det_imposto_icms_vicmsstdest =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pRedBCFfet":
                                  modeloProduto.det_imposto_icms_predbcffet =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "CSOSN":
                                  modeloProduto.det_imposto_icms_csosn =
                                    nosFilhosICMS[i].textContent;

                                  break;

                                case "vBC":
                                  modeloProduto.det_imposto_icms_vbc =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pICMS":
                                  modeloProduto.det_imposto_icms_picms =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vICMS":
                                  modeloProduto.det_imposto_icms_vicms =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "modBCST":
                                  modeloProduto.det_imposto_icms_modbcst =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pMVAST":
                                  modeloProduto.det_imposto_icms_pmvast =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vBCST":
                                  modeloProduto.det_imposto_icms_vbcst =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "pICMSST":
                                  modeloProduto.det_imposto_icms_picmsst =
                                    nosFilhosICMS[i].textContent;

                                  break;
                                case "vICMSST":
                                  modeloProduto.det_imposto_icms_vicmsst =
                                    nosFilhosICMS[i].textContent;

                                  break;

                                default:
                                  break;
                              }
                            }

                            break;
                          case "IPI":
                            var nosFilhosIPI =
                              nosFilhosProdImposto[i].childNodes; // pega os nos filhos de IPI [cnpjprod, cenq, ipitrib]

                            for (let i = 0; i < nosFilhosIPI.length; i++) {
                              switch (nosFilhosIPI[i].tagName) {
                                case "CNPJProd":
                                  modeloProduto.det_imposto_ipi_cnpjprod =
                                    nosFilhosIPI[i].textContent;

                                  break;
                                case "cSelo":
                                  modeloProduto.det_imposto_ipi_cselo =
                                    nosFilhosIPI[i].textContent;

                                  break;
                                case "qSelo":
                                  modeloProduto.det_imposto_ipi_qselo =
                                    nosFilhosIPI[i].textContent;

                                  break;
                                case "cEnq":
                                  modeloProduto.det_imposto_ipi_cenq =
                                    nosFilhosIPI[i].textContent;

                                  break;
                                case "IPITrib":
                                  var nosFilhosIPI_TRIB =
                                    nosFilhosIPI[i].childNodes; // pega os nos filhos de IPITrib [cst, vbc, pIPI, vIPI]

                                  for (
                                    let i = 0;
                                    i < nosFilhosIPI_TRIB.length;
                                    i++
                                  ) {
                                    switch (nosFilhosIPI_TRIB[i].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_ipitrib_cst =
                                          nosFilhosIPI_TRIB[i].textContent;

                                        break;
                                      case "vBC":
                                        modeloProduto.det_imposto_ipitrib_vbc =
                                          nosFilhosIPI_TRIB[i].textContent;

                                        break;
                                      case "pIPI":
                                        modeloProduto.det_imposto_ipitrib_pipi =
                                          nosFilhosIPI_TRIB[i].textContent;

                                        break;
                                      case "vIPI":
                                        modeloProduto.det_imposto_ipitrib_vipi =
                                          nosFilhosIPI_TRIB[i].textContent;

                                        break;
                                      default:
                                        break;
                                    }
                                  }
                                  break;
                                case "IPINT": //  OBS: TA PEGANDO A MESMA VARIAVEL DO IPITRIB NO MODELO PRODUTO
                                  var nosFilhosIPI_IPINT =
                                    nosFilhosIPI[i].childNodes; // pega os nos filhos de IPINT [cst, vbc, pIPI, vIPI]

                                  for (
                                    let i = 0;
                                    i < nosFilhosIPI_IPINT.length;
                                    i++
                                  ) {
                                    switch (nosFilhosIPI_IPINT[i].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_ipitrib_cst =
                                          nosFilhosIPI_IPINT[i].textContent;

                                        break;
                                      case "vBC":
                                        modeloProduto.det_imposto_ipitrib_vbc =
                                          nosFilhosIPI_IPINT[i].textContent;

                                        break;
                                      case "pIPI":
                                        modeloProduto.det_imposto_ipitrib_pipi =
                                          nosFilhosIPI_IPINT[i].textContent;

                                        break;
                                      case "vIPI":
                                        modeloProduto.det_imposto_ipitrib_vipi =
                                          nosFilhosIPI_IPINT[i].textContent;

                                        break;
                                      default:
                                        break;
                                    }
                                  }
                                  break;
                                default:
                                  break;
                              }
                            }
                            break;
                          case "PIS":
                            var nosFilhosPisAliq =
                              nosFilhosProdImposto[i].childNodes; // pega o no PIS dps pega os filhos dele (PISAliq)
                            nosFilhosPisAliq.forEach(function (elem, index) {
                              switch (nosFilhosPisAliq[index].tagName) {
                                case "PISAliq":
                                  var noFilhosPISAliq =
                                    nosFilhosPisAliq[index].childNodes; // pega o no PISAliq dps pega os filhos dele (cst, vbc, ppis...)

                                  noFilhosPISAliq.forEach(function (
                                    elem,
                                    index
                                  ) {
                                    switch (noFilhosPISAliq[index].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_pis_pisaliq_cst =
                                          noFilhosPISAliq[index].textContent;

                                        break;
                                      case "vBC":
                                        modeloProduto.det_imposto_pis_pisaliq_vbc =
                                          noFilhosPISAliq[index].textContent;

                                        break;
                                      case "pPIS":
                                        modeloProduto.det_imposto_pis_pisaliq_ppis =
                                          noFilhosPISAliq[index].textContent;

                                        break;
                                      case "vPIS":
                                        modeloProduto.det_imposto_pis_pisaliq_vpis =
                                          noFilhosPISAliq[index].textContent;

                                        break;

                                      default:
                                        break;
                                    }
                                  });

                                  break;
                                case "PISQtde":
                                  var noFilhosPISQtde =
                                    nosFilhosPisAliq[index].childNodes; // pega o no PISAliq dps pega os filhos dele (cst, vbc, ppis...)

                                  noFilhosPISQtde.forEach(function (
                                    elem,
                                    index
                                  ) {
                                    switch (noFilhosPISQtde[index].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_pis_pisqtde_cst =
                                          noFilhosPISQtde[index].textContent;

                                        break;
                                      case "qBCProd":
                                        modeloProduto.det_imposto_pis_pisqtde_qbcprod =
                                          noFilhosPISQtde[index].textContent;

                                        break;
                                      case "vAliqProd":
                                        modeloProduto.det_imposto_pis_pisqtde_valiqprod =
                                          noFilhosPISQtde[index].textContent;

                                        break;
                                      case "vPIS":
                                        modeloProduto.det_imposto_pis_pisqtde_vpis =
                                          noFilhosPISQtde[index].textContent;

                                        break;

                                      default:
                                        break;
                                    }
                                  });
                                  break;
                                case "PISNT":
                                  var noFilhosPISNT =
                                    nosFilhosPisAliq[index].childNodes; // pega o no PISAliq dps pega os filhos dele (cst, vbc, ppis...)

                                  noFilhosPISNT.forEach(function (elem, index) {
                                    switch (noFilhosPISNT[index].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_pis_pisnt_cst =
                                          noFilhosPISNT[index].textContent;

                                        break;

                                      default:
                                        break;
                                    }
                                  });

                                  break;
                                case "PISOutr":
                                  var noFilhosPISOutr =
                                    nosFilhosPisAliq[index].childNodes; // pega o no PISAliq dps pega os filhos dele (cst, vbc, ppis...)

                                  noFilhosPISOutr.forEach(function (
                                    elem,
                                    index
                                  ) {
                                    switch (noFilhosPISOutr[index].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_pis_outr_cst =
                                          noFilhosPISOutr[index].textContent;

                                        break;
                                      case "vBC":
                                        modeloProduto.det_imposto_pis_outr_vbc =
                                          noFilhosPISOutr[index].textContent;

                                        break;
                                      case "pPis":
                                        modeloProduto.det_imposto_pis_outr_ppis =
                                          noFilhosPISOutr[index].textContent;

                                        break;
                                      case "qBCProd":
                                        modeloProduto.det_imposto_pis_outr_qbcProd =
                                          noFilhosPISOutr[index].textContent;

                                        break;
                                      case "vAliqProd":
                                        modeloProduto.det_imposto_pis_outr_valiqprod =
                                          noFilhosPISOutr[index].textContent;

                                        break;
                                      case "vPIS":
                                        modeloProduto.det_imposto_pis_outr_vpis =
                                          noFilhosPISOutr[index].textContent;

                                        break;

                                      default:
                                        break;
                                    }
                                  });
                                  break;
                                default:
                                  break;
                              }
                            });

                            break;
                          case "COFINS":
                            var noFilhosCofins =
                              nosFilhosProdImposto[i].childNodes; // pega os nos filhos de cofins [cofinsaliq]
                            noFilhosCofins.forEach(function (elem, index) {
                              switch (noFilhosCofins[index].tagName) {
                                case "COFINSAliq":
                                  var noFilhosCofisaAliq =
                                    noFilhosCofins[index].childNodes;

                                  noFilhosCofisaAliq.forEach(function (
                                    elem,
                                    index
                                  ) {
                                    switch (noFilhosCofisaAliq[index].tagName) {
                                      case "CST":
                                        modeloProduto.det_imposto_cofins_cst =
                                          noFilhosCofisaAliq[index].textContent;

                                        break;
                                      case "vBC":
                                        modeloProduto.det_imposto_cofins_vbc =
                                          noFilhosCofisaAliq[index].textContent;

                                        break;
                                      case "pCOFINS":
                                        modeloProduto.det_imposto_cofins_pcofins =
                                          noFilhosCofisaAliq[index].textContent;

                                        break;
                                      case "vCOFINS":
                                        modeloProduto.det_imposto_cofins_vcofins =
                                          noFilhosCofisaAliq[index].textContent;

                                        break;
                                      default:
                                        break;
                                    }
                                  });

                                  break;
                                default:
                                  break;
                              }
                            });

                            break;

                          default:
                            break;
                        }
                      }

                      break;
                    case "infAdProd":
                      modeloProduto.det_infadprod = noFilhos_det[i].textContent;

                      break;

                    default:
                      break;
                  }
                }

                this.modeloNovaNotaXML.det_produtos.push(modeloProduto); // adiciona o produto ao array que sera enviado para o sevidor
              }
              modeloProduto = null; // limpa modelo produto

              const nfeNoPai_total = xmlDoc.getElementsByTagName("total"); // total (valores totais icms, somatorio de valores dos itens)
              for (let i = 0; i < nfeNoPai_total.length; i++) {
                var modeloTotaisICMS = {}; // modelo total icms
                let noFilhos_total = nfeNoPai_total[i].childNodes; // pega o no total e pega seus nos filhos [ICMSTot..]
                noFilhos_total.forEach(function (elem, index) {
                  switch (noFilhos_total[index].tagName) {
                    case "ICMSTot":
                      var noFilhosIcmsTot = noFilhos_total[index].childNodes; // pega os nos filhos de icmsTot [vbc, vcms, vst, vfreet...]

                      noFilhosIcmsTot.forEach(function (elem, index) {
                        switch (noFilhosIcmsTot[index].tagName) {
                          case "vBC":
                            modeloTotaisICMS.total_vbc =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vICMS":
                            modeloTotaisICMS.total_vicms =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vICMSDeson":
                            modeloTotaisICMS.total_vicmsdeson =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vFCPUFDest":
                            modeloTotaisICMS.total_vfcpufdest =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vICMSUFDest":
                            modeloTotaisICMS.total_vicmsufdest =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vICMSUFRemet":
                            modeloTotaisICMS.total_vicmsufremet =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vFCP":
                            modeloTotaisICMS.total_vfcp =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vBCST":
                            modeloTotaisICMS.total_vbcst =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vST":
                            modeloTotaisICMS.total_vst =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vFCPST":
                            modeloTotaisICMS.total_vfcpst =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vFCPSTRet":
                            modeloTotaisICMS.total_vfcpstret =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vProd":
                            modeloTotaisICMS.total_vprod =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vFrete":
                            modeloTotaisICMS.total_vfrete =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vSeg":
                            modeloTotaisICMS.total_vseg =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vDesc":
                            modeloTotaisICMS.total_vdesc =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vII":
                            modeloTotaisICMS.total_vii =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "finNFe":
                            modeloTotaisICMS.total_finnfe =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vIPI":
                            modeloTotaisICMS.total_vipi =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vIPIDevol":
                            modeloTotaisICMS.total_vipidevol =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vPIS":
                            modeloTotaisICMS.total_vpis =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vCOFINS":
                            modeloTotaisICMS.total_vcofins =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vOutro":
                            modeloTotaisICMS.total_voutro =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vNF":
                            modeloTotaisICMS.total_vnf =
                              noFilhosIcmsTot[index].textContent;

                            break;
                          case "vTotTrib":
                            modeloTotaisICMS.total_vtottrib =
                              noFilhosIcmsTot[index].textContent;
                            /* console.log(
                          "vTotTrib: " + noFilhosIcmsTot[index].textContent
                        ); */

                            break;

                          default:
                            break;
                        }
                      });
                      break;
                    default:
                      break;
                  }
                });
                this.modeloNovaNotaXML.total_vlrs_icms = modeloTotaisICMS; // adiciona o valores totais ao array que sera enviado para o sevidor
              }
              modeloTotaisICMS = null; // limpa o medelo total

              const nfeNoPai_transp = xmlDoc.getElementsByTagName("transp"); // transportadora
              for (let i = 0; i < nfeNoPai_transp.length; i++) {
                var modeloTransp = {};
                let noFilhos_transp = nfeNoPai_transp[i].childNodes; // pega os nos filhos de transp [modFret, transporta, vol...]

                for (let i = 0; i < noFilhos_transp.length; i++) {
                  switch (noFilhos_transp[i].tagName) {
                    case "modFrete":
                      modeloTransp.transp_modfret_modfret =
                        noFilhos_transp[i].textContent;

                      break;
                    case "transporta":
                      var nosFilhosTransporta = noFilhos_transp[i].childNodes; // pega os nos filhos de transporta [cnpj, xnome, ie, xender...]

                      for (let i = 0; i < nosFilhosTransporta.length; i++) {
                        switch (nosFilhosTransporta[i].tagName) {
                          case "CPF":
                            modeloTransp.transp_transporta_cpf =
                              nosFilhosTransporta[i].textContent;

                            break;
                          case "CNPJ":
                            modeloTransp.transp_transporta_cnpj =
                              nosFilhosTransporta[i].textContent;

                            break;
                          case "xNome":
                            modeloTransp.transp_transporta_xnome =
                              nosFilhosTransporta[i].textContent;

                            break;
                          case "IE":
                            modeloTransp.transp_transporta_ie =
                              nosFilhosTransporta[i].textContent;

                            break;
                          case "xEnder":
                            modeloTransp.transp_transporta_xender =
                              nosFilhosTransporta[i].textContent;

                            break;
                          case "xMun":
                            modeloTransp.transp_transporta_xmun =
                              nosFilhosTransporta[i].textContent;

                            break;
                          case "UF":
                            modeloTransp.transp_transporta_uf =
                              nosFilhosTransporta[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }

                      break;
                    case "retTransp":
                      var nosFilhosRettTrasnp = noFilhos_transp[i].childNodes; // pega os nos filhos de retttransp [vServ, vBCRet, pICMSSRet...]

                      for (let i = 0; i < nosFilhosRettTrasnp.length; i++) {
                        switch (nosFilhosRettTrasnp[i].tagName) {
                          case "vServ":
                            modeloTransp.transp_rettransp_vserv =
                              nosFilhosRettTrasnp[i].textContent;

                            break;
                          case "vBCRet":
                            modeloTransp.transp_rettransp_vbcret =
                              nosFilhosRettTrasnp[i].textContent;

                            break;
                          case "pICMSRet":
                            modeloTransp.transp_rettransp_picmsret =
                              nosFilhosRettTrasnp[i].textContent;

                            break;
                          case "vICMSRet":
                            modeloTransp.transp_rettransp_vicmsret =
                              nosFilhosRettTrasnp[i].textContent;

                            break;
                          case "CFOP":
                            modeloTransp.transp_rettransp_cfop =
                              nosFilhosRettTrasnp[i].textContent;

                            break;
                          case "cMunFG":
                            modeloTransp.transp_rettransp_cmunfg =
                              nosFilhosRettTrasnp[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }

                      break;
                    case "veicTransp":
                      var nosFilhosVeicTransp = noFilhos_transp[i].childNodes; // pega os nos filhos de veicTrans [placa, uf, rntc...]

                      for (let i = 0; i < nosFilhosVeicTransp.length; i++) {
                        switch (nosFilhosVeicTransp[i].tagName) {
                          case "placa":
                            modeloTransp.transp_veictrans_placa =
                              nosFilhosVeicTransp[i].textContent;

                            break;
                          case "UF":
                            modeloTransp.transp_veictrans_uf =
                              nosFilhosVeicTransp[i].textContent;

                            break;
                          case "RNTC":
                            modeloTransp.transp_veictrans_rntc =
                              nosFilhosVeicTransp[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }
                      break;
                    case "vol":
                      var nosFilhosVol = noFilhos_transp[i].childNodes; // pega os nos filhos de vol [qVol, esp, ie, pesoL...]

                      for (let i = 0; i < nosFilhosVol.length; i++) {
                        switch (nosFilhosVol[i].tagName) {
                          case "qVol":
                            modeloTransp.transp_vol_qvol =
                              nosFilhosVol[i].textContent;

                            break;
                          case "esp":
                            modeloTransp.transp_vol_esp =
                              nosFilhosVol[i].textContent;

                            break;
                          case "marca":
                            modeloTransp.transp_vol_marca =
                              nosFilhosVol[i].textContent;

                            break;
                          case "nVol":
                            modeloTransp.transp_vol_nvol =
                              nosFilhosVol[i].textContent;

                            break;
                          case "pesoL":
                            modeloTransp.transp_vol_pesol =
                              nosFilhosVol[i].textContent;

                            break;
                          case "pesoB":
                            modeloTransp.transp_vol_pesob =
                              nosFilhosVol[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }

                      break;

                    default:
                      break;
                  }
                }
                this.modeloNovaNotaXML.transpo = modeloTransp;
              }
              modeloTransp = null; // limpa o medelo total

              const nfeNoPai_cobr = xmlDoc.getElementsByTagName("cobr"); // cobranças
              for (let i = 0; i < nfeNoPai_cobr.length; i++) {
                var modeloCobr = {}; // modelo cobranças
                modeloCobr.dup = []; // array para guarda as parcelas de cobranças
                let noFilhos_cobr = nfeNoPai_cobr[i].childNodes; // pega o no cobr e pega seus nos filhos [fat, dup...]
                noFilhos_cobr.forEach(function (elem, index) {
                  switch (noFilhos_cobr[index].tagName) {
                    case "fat":
                      var noFilhosFat = noFilhos_cobr[index].childNodes; // pega os nos filhos de fat [nFat, vOrigi, vDesc...]

                      noFilhosFat.forEach(function (elem, index) {
                        switch (noFilhosFat[index].tagName) {
                          case "nFat":
                            modeloCobr.cobr_fat_nfat =
                              noFilhosFat[index].textContent;

                            break;
                          case "vOrig":
                            modeloCobr.cobr_fat_vorig =
                              noFilhosFat[index].textContent;

                            break;
                          case "vDesc":
                            modeloCobr.cobr_fat_vdesc =
                              noFilhosFat[index].textContent;

                            break;
                          case "vLiq":
                            modeloCobr.cobr_fat_vliq =
                              noFilhosFat[index].textContent;

                            break;

                          default:
                            break;
                        }
                      });
                      break;
                    case "dup":
                      var modeloDup = {};
                      var noFilhosDup = noFilhos_cobr[index].childNodes; // pega os nos filhos de dup [ndup, dvenc, vdup...]

                      for (let i = 0; i < noFilhosDup.length; i++) {
                        switch (noFilhosDup[i].tagName) {
                          case "nDup":
                            modeloDup.cobr_dup_ndup =
                              noFilhosDup[i].textContent;

                            break;
                          case "dVenc":
                            modeloDup.cobr_dup_dvenc =
                              noFilhosDup[i].textContent;

                            break;
                          case "vDup":
                            modeloDup.cobr_dup_vdup =
                              noFilhosDup[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }
                      modeloCobr.dup.push(modeloDup); // adiciona a parcela no meu array
                      break;
                    default:
                      break;
                  }
                });
                this.modeloNovaNotaXML.cobr = modeloCobr; // adiciona o array de parcela para ser enviado ao sevidor
              }
              modeloCobr = null; // limpa o medelo cobr

              const nfeNoPai_pag = xmlDoc.getElementsByTagName("pag"); // pag
              for (let i = 0; i < nfeNoPai_pag.length; i++) {
                var modeloPag = {};
                let noFilhos_pag = nfeNoPai_pag[i].childNodes; // pega os nos filhos de pag[detPag...]
                for (let i = 0; i < noFilhos_pag.length; i++) {
                  switch (noFilhos_pag[i].tagName) {
                    case "detPag":
                      var nosFilhosDetPag = noFilhos_pag[i].childNodes; // pega os nos filhos de detPag [indPag, tPag, vPag...]
                      for (let i = 0; i < nosFilhosDetPag.length; i++) {
                        switch (nosFilhosDetPag[i].tagName) {
                          case "indPag":
                            modeloPag.pag_indpag =
                              nosFilhosDetPag[i].textContent;

                            break;
                          case "tPag":
                            modeloPag.pag_tpag = nosFilhosDetPag[i].textContent;

                            break;
                          case "vPag":
                            modeloPag.pag_vpag = nosFilhosDetPag[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }
                      break;

                    default:
                      break;
                  }
                }
                this.modeloNovaNotaXML.pag = modeloPag;
              }
              modeloPag = null; // limpa o medelo pag

              const nfeNoPai_protNFe = xmlDoc.getElementsByTagName("protNFe"); // protocolo nfe
              for (let i = 0; i < nfeNoPai_protNFe.length; i++) {
                var modeloProtNFe = {};
                let noFilhos_ProtNFE = nfeNoPai_protNFe[i].childNodes; // pega os nos filhos de protNFE [infProt...]
                var versaoNFE = nfeNoPai_protNFe[i].attributes.versao.nodeValue; // pega a versão do nfe
                modeloProtNFe.versao_nfe = versaoNFE; // salva a vensao no modeloprot
                for (let i = 0; i < noFilhos_ProtNFE.length; i++) {
                  switch (noFilhos_ProtNFE[i].tagName) {
                    case "infProt":
                      var nosFilhosInfProt = noFilhos_ProtNFE[i].childNodes; // pega os nos filhos de infProt [tpAmb, verAplic, chNFe...]
                      for (let i = 0; i < nosFilhosInfProt.length; i++) {
                        switch (nosFilhosInfProt[i].tagName) {
                          case "tpAmb":
                            modeloProtNFe.protnfe_tpamb =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "verAplic":
                            modeloProtNFe.protnfe_veraplic =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "chNFe":
                            modeloProtNFe.protnfe_chnfe =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "dhRecbto":
                            modeloProtNFe.protnfe_dhrecbto =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "nProt":
                            modeloProtNFe.protnfe_nprot =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "digVal":
                            modeloProtNFe.protnfe_digval =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "cStat":
                            modeloProtNFe.protnfe_cstat =
                              nosFilhosInfProt[i].textContent;

                            break;
                          case "xMotivo":
                            modeloProtNFe.protnfe_xmotivo =
                              nosFilhosInfProt[i].textContent;

                            break;

                          default:
                            break;
                        }
                      }
                      break;

                    default:
                      break;
                  }
                }
                this.modeloNovaNotaXML.protnfe = modeloProtNFe;
              }
              modeloProtNFe = null; // limpa o medelo cobr
              this.modeloNovaNotaXML.notaOriginal = null;
              this.modeloNovaNotaXML.notaOriginal = notaXML; // nota completa

              const url = `${baseApiUrl}/cadastro_compras`;
              axios["post"](url, this.modeloNovaNotaXML)
                .then(() => {
                  msgNotasSucessoMod.push(
                    this.modeloNovaNotaXML.protnfe.protnfe_chnfe
                  );
                })
                .catch((e) => {
                  const modeloError = {};
                  modeloError.chave =
                    this.modeloNovaNotaXML.protnfe.protnfe_chnfe;
                  modeloError.error = e.response.data;
                  msgNotasImportadaErroMod.push(modeloError);
                });
            };
          } catch (erro) {
            showError("Erro ao tentar ler o XML! <br>Erro: " + erro);
          }
          this.msgNotasImportadaErro = msgNotasImportadaErroMod;
          this.msgNotasSucesso = msgNotasSucessoMod;
        } else {
          this.$toasted.global.erroXmlNaoSelec();
        }
        indexDo++;
      } while (indexDo < file.length);
      file = null; // reseta o file
    },
  },
  created() {
    if (this.mode == "ImportarXML") {
      this.arquivosXmlCompra = [];
      this.msgNotasImportadaErro = null;
      this.msgNotasSucesso = null;
    }
  },
};
</script>

<style >
.container-import-xml {
  padding: 5px 10px;
  background-color: #eaeaea;
  border: #dbdbdb solid 1px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btn-compra-importa-cancelar {
  margin-bottom: 7px;
  margin-top: 25px;
}
.btn-compra-importa-cancelar button {
  padding: 3px 35px;
  font-size: 14px;
  margin-right: 10px;
}
</style>