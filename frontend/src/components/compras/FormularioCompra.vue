<template>
  <b-container fluid class="p-0 formulario-compras">
    <b-form class="form-cadastros-form-compra">
      <input
        type="hidden"
        id="form-compra-codigo_compra"
        v-model="compra.codigo_compra"
      />

      <h5><i class="fa fa-list-alt mr-1"></i> Dados da NF-e</h5>
      <b-row class="m-0">
        <b-col class="container-com-borda" cols="4"
          >Natureza da operação
        </b-col>
        <b-col class="container-com-borda" cols="2">Série/NFe </b-col>
        <b-col class="container-com-borda" cols="2">Data da emissão </b-col>
        <b-col class="container-com-borda" cols="4">Chave de acesso </b-col>
      </b-row>
      <b-row class="border border-top-0 m-0 p-0">
        <b-col cols="4" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-natureza-operacao"
            type="text"
            autocomplete="off"
            v-model="compra.natureza_operacao"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-serie-nmr"
            type="text"
            autocomplete="off"
            v-model="compra.serie_numero"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <span v-show="false">
            {{ (compra.data_emissao = formatDataBR(compra.data_emissao)) }}
          </span>
          <b-form-input
            size="sm"
            id="form-compra-data-emissao"
            type="text"
            autocomplete="off"
            v-model="compra.data_emissao"
            required
            readonly
          />
        </b-col>
        <b-col cols="4" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-chave-acesso"
            type="text"
            autocomplete="off"
            v-model="compra.chave_acesso"
            required
            readonly
          />
        </b-col>
      </b-row>

      <h5><i class="fa fa-address-card mr-1 mt-4"></i> Dados do emitente</h5>
      <b-row class="m-0">
        <b-col class="container-com-borda" cols="4">Razão social </b-col>
        <b-col class="container-com-borda" cols="4">Fantasia </b-col>
        <b-col class="container-com-borda" cols="2">CNPJ </b-col>
        <b-col class="container-com-borda" cols="2">Inscrição estadual </b-col>
      </b-row>
      <b-row class="border border-top-0 m-0 p-0">
        <b-col cols="4" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-emitente-razao-social"
            type="text"
            autocomplete="off"
            v-model="compra.razao_social"
            required
            readonly
          />
        </b-col>
        <b-col cols="4" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-emitente-nome-fantasia"
            type="text"
            autocomplete="off"
            v-model="compra.fantasia"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-emitente-cnpj"
            type="text"
            autocomplete="off"
            v-model="compra.cnpj"
            v-mask="'##.###.###/####-##'"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-emitente-ie"
            type="text"
            autocomplete="off"
            v-model="compra.inscricao_estadual"
            required
            readonly
          />
        </b-col>
      </b-row>
      <b-row class="m-0 mt-1">
        <b-col class="container-com-borda" cols="4">Endereço </b-col>
        <b-col class="container-com-borda" cols="2">Bairro </b-col>
        <b-col class="container-com-borda" cols="2">Cidade/UF </b-col>
        <b-col class="container-com-borda" cols="2">CEP </b-col>
        <b-col class="container-com-borda" cols="2">Telefone </b-col>
      </b-row>
      <b-row class="border border-top-0 m-0 p-0">
        <b-col cols="4" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-emitente-endereco"
            type="text"
            autocomplete="off"
            v-model="compra.endereco"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-emitente-bairro"
            type="text"
            autocomplete="off"
            v-model="compra.bairro"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-emitente-cidade-uf"
            type="text"
            autocomplete="off"
            v-model="compra.cidade_uf"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-emitente-cep"
            type="text"
            autocomplete="off"
            v-model="compra.cep"
            v-mask="'#####-###'"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-emitente-telefone"
            type="text"
            autocomplete="off"
            v-model="compra.telefone"
            required
            readonly
          />
        </b-col>
      </b-row>

      <h5><i class="fa fa-cube mr-1 mt-4"></i> Produtos</h5>
      <div
        v-show="dataProdutos.length > 0"
        class="d-flex"
        v-for="(produto, k) in dataProdutos"
        :key="'prod-' + k"
        :id="'item-nota-' + k"
      >
        <div class="css-index-item">{{ k + 1 }}</div>
        <div class="css-container-item">
          <b-row class="m-0">
            <b-col class="container-com-borda" cols="2">Código </b-col>
            <b-col class="container-com-borda" cols="4"
              >Descrição do produto
            </b-col>
            <b-col class="container-com-borda" cols="1">Unidade </b-col>
            <b-col class="container-com-borda" cols="1">Quant. </b-col>
            <b-col class="container-com-borda" cols="2">Vr. unitário </b-col>
            <b-col class="container-com-borda" cols="2">Vr. total </b-col>
          </b-row>
          <b-row class="m-0">
            <b-col cols="2" class="m-0 p-1 border">
              <b-form-input
                size="sm"
                :id="'form-compra-item-codigo-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.codigo_mercadoria_fornecedor"
                required
                readonly
              />
            </b-col>
            <b-col cols="4" class="m-0 p-1 border">
              <b-form-input
                size="sm"
                :id="'form-compra-item-mercadoria-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.descricao_produto"
                required
                readonly
              />
            </b-col>
            <b-col cols="1" class="m-0 p-1 border">
              <b-form-input
                size="sm"
                :id="'form-compra-item-unidade-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.unidade"
                required
                readonly
              />
            </b-col>
            <b-col cols="1" class="m-0 p-1 border">
              <b-form-input
                size="sm"
                :id="'form-compra-item-quantidade-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.quantidade"
                required
                readonly
              />
            </b-col>
            <b-col cols="2" class="m-0 p-1 border">
              <money
                class="form-control"
                v-bind="maskDinheiroSemRS"
                size="sm"
                :id="'form-compra-item-vlr-unitario-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.valor_unitario"
                required
                readonly
              />
            </b-col>
            <b-col cols="2" class="m-0 p-1 border">
              <money
                class="form-control"
                v-bind="maskDinheiroSemRS"
                size="sm"
                :id="'form-compra-item-vlr-total-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.valor_total"
                required
                readonly
              />
            </b-col>
          </b-row>
          <b-row class="m-0">
            <b-col class="container-com-borda" cols="2">NCM </b-col>
            <b-col class="container-com-borda" cols="2">CFOP </b-col>
            <b-col class="container-com-borda" cols="2">Frete </b-col>
            <b-col class="container-com-borda" cols="1">Desconto </b-col>
            <b-col class="container-com-borda" cols="1">ICMS ST </b-col>
            <b-col class="container-com-borda" cols="2">Valor do IPI </b-col>
            <b-col class="container-com-borda" cols="2">Outras Despesas </b-col>
          </b-row>
          <b-row class="m-0">
            <b-col cols="2" class="m-0 p-1 border">
              <b-form-input
                size="sm"
                :id="'form-compra-item-ncm-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.ncm"
                required
                readonly
              />
            </b-col>
            <b-col cols="2" class="m-0 p-1 border">
              <b-form-input
                size="sm"
                :id="'form-compra-item-cfop-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.cfop"
                required
                readonly
              />
            </b-col>
            <b-col cols="2" class="m-0 p-1 border">
              <money
                class="form-control"
                v-bind="maskDinheiroSemRS"
                size="sm"
                :id="'form-compra-item-frete-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.frete"
                required
                readonly
              />
            </b-col>
            <b-col cols="1" class="m-0 p-1 border">
              <money
                class="form-control"
                v-bind="maskDinheiroSemRS"
                size="sm"
                :id="'form-compra-item-desconto-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.desconto"
                required
                readonly
              />
            </b-col>
            <b-col cols="1" class="m-0 p-1 border">
              <money
                class="form-control"
                v-bind="maskDinheiroSemRS"
                size="sm"
                :id="'form-compra-item-icms-st-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.icms_st"
                required
                readonly
              />
            </b-col>
            <b-col cols="2" class="m-0 p-1 border">
              <money
                class="form-control"
                v-bind="maskDinheiroSemRS"
                size="sm"
                :id="'form-compra-item-valor-ipi-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.valor_ipi"
                required
                readonly
              />
            </b-col>
            <b-col cols="2" class="m-0 p-1 border">
              <money
                class="form-control"
                v-bind="maskDinheiroSemRS"
                size="sm"
                :id="'form-compra-item-outras-despesas-' + k"
                type="text"
                autocomplete="off"
                v-model="produto.outras_despesas"
                required
                readonly
              />
            </b-col>
            <b-col cols="12" class="m-0 mt-1 p-1">
              <b-alert show variant="warning" class="p-1 m-0 d-flex">
                <b-form-group class="p-0 m-0 flex-fill">
                  <div class="d-flex ml-1">
                    <div class="text-nowrap mr-2" style="height: 26px">
                      Este produto não possui cadastro, deseja cadastrá-lo?
                    </div>
                    <b-form-radio
                      class="mr-2"
                      v-model="produto.novo_naocadastrar_referenciar"
                      required
                      :name="'novo-item-' + k"
                      value="Nova"
                      >Sim</b-form-radio
                    >
                    <b-form-radio
                      class="mr-2 text-nowrap"
                      v-model="produto.novo_naocadastrar_referenciar"
                      required
                      :name="'referenciar-item' + k"
                      value="Referenciada"
                      >Buscar no sistema</b-form-radio
                    >
                    <b-form-input
                      @blur="
                        mercadoriaReferenciadaValida(
                          produto.mercadoria_referenciada,
                          k
                        )
                      "
                      :id="'form-compra-item-mercadoria-referenciada-' + k"
                      v-show="
                        produto.novo_naocadastrar_referenciar == 'Referenciada'
                      "
                      style="height: 25px"
                      autocomplete="off"
                      type="search"
                      v-model="produto.mercadoria_referenciada"
                      required
                      list="my-list-mercadoria-from-db"
                    />
                    <b-form-datalist
                      :options="dataMercadoriaFromDB"
                      id="my-list-mercadoria-from-db"
                    >
                    </b-form-datalist>
                  </div>
                </b-form-group>
              </b-alert>
            </b-col>
          </b-row>

          <b-row class="m-0 mt-1">
            <b-col class="container-com-borda" cols="5">
              <h6 class="p-0 m-0">
                <i class="fa fa-arrows-h mr-1"></i> Conversão de unidade
              </h6>
              <b-row class="m-0 mt-3">
                <b-col cols="3" class="m-0 p-1 border text-center">
                  <h6 class="pt-2">
                    <span class="mr-2"> <b>1</b> </span> |<b>
                      {{ produto.unidade }}</b
                    >
                  </h6>
                </b-col>
                <b-col cols="3" class="m-0 p-1 border mt-1 mb-1">
                  <h6 class="pt-1 ml-1">equivale a</h6>
                </b-col>
                <b-col cols="3" class="m-0 p-1 pt-2 border">
                  <money
                    class="form-control"
                    style="height: 31px; font-size: 15px"
                    size="sm"
                    :id="'form-compra-item-qtda-converter-' + k"
                    type="text"
                    autocomplete="off"
                    v-model="produto.quantidade_converter"
                    v-bind="maskInteiro"
                    required
                  />
                </b-col>
                <b-col
                  :id="'form-compra-item-qtda-entrar-estoque-' + k"
                  cols="3"
                  class="
                    border
                    text-center
                    d-flex
                    align-items-center
                    justify-content-center
                    mt-1
                    mb-1
                  "
                >
                  <h6 class="pt-2">
                    {{ produto.quantidade_converter * produto.quantidade }}
                  </h6>
                </b-col>
              </b-row>
            </b-col>
            <b-col class="container-com-borda" cols="7">
              <h6 class="p-0 m-0">
                <i class="fa fa-money mr-1"></i> Valor de venda
              </h6>
              <b-row class="m-0 mt-2">
                <b-col class="container-com-borda" cols="3"
                  >Preço padrão
                </b-col>
                <b-col class="container-com-borda" cols="3">Preço A </b-col>
                <b-col class="container-com-borda" cols="3">Preço B </b-col>
                <b-col class="container-com-borda" cols="3">Preço C </b-col>
              </b-row>
              <b-row class="m-0">
                <b-col cols="3" class="m-0 p-1 border">
                  <money
                    class="form-control"
                    v-bind="maskDinheiroSemRS"
                    size="sm"
                    :id="'form-compra-item-preco-venda-padrao-' + k"
                    type="text"
                    autocomplete="off"
                    v-model="produto.preco_venda"
                    required
                  />
                </b-col>
                <b-col cols="3" class="m-0 p-1 border">
                  <money
                    class="form-control"
                    v-bind="maskDinheiroSemRS"
                    size="sm"
                    :id="'form-compra-item-preco-venda-a-' + k"
                    type="text"
                    autocomplete="off"
                    v-model="produto.preco_venda_f1"
                    required
                  />
                </b-col>
                <b-col cols="3" class="m-0 p-1 border">
                  <money
                    class="form-control"
                    v-bind="maskDinheiroSemRS"
                    size="sm"
                    :id="'form-compra-item-preco-venda-b-' + k"
                    type="text"
                    autocomplete="off"
                    v-model="produto.preco_venda_f2"
                    required
                  />
                </b-col>
                <b-col cols="3" class="m-0 p-1 border">
                  <money
                    class="form-control"
                    v-bind="maskDinheiroSemRS"
                    size="sm"
                    :id="'form-compra-item-preco-venda-c-' + k"
                    type="text"
                    autocomplete="off"
                    v-model="produto.preco_venda_f3"
                    required
                  />
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </div>
      <div
        class="w-100 text-center border p-5"
        v-show="dataProdutos.length == 0"
      >
        <i class="fa fa-spinner fa-pulse fa-5x fa-fw m-5"></i>
      </div>

      <h5><i class="fa fa-truck mr-1 mt-3"></i> Transporte</h5>
      <div v-if="compra.trans_razao">
        <b-row class="m-0">
          <b-col class="container-com-borda" cols="6">Razão social </b-col>
          <b-col class="container-com-borda" cols="3">CNPJ/CPF </b-col>
          <b-col class="container-com-borda" cols="3"
            >Inscrição estadual
          </b-col>
        </b-row>
        <b-row class="border border-top-0 m-0 p-0">
          <b-col cols="6" class="m-0 p-1 border border-top-0">
            <b-form-input
              size="sm"
              id="form-compra-transporte-razao-social"
              type="text"
              autocomplete="off"
              v-model="compra.trans_razao"
              required
              readonly
            />
          </b-col>
          <b-col
            v-if="compra.trans_cpf"
            cols="3"
            class="m-0 p-1 border border-top-0"
          >
            <b-form-input
              size="sm"
              id="form-compra-transporte-cpf"
              type="text"
              autocomplete="off"
              v-model="compra.trans_cpf"
              v-mask="'###.###.###-##'"
              required
              readonly
            />
          </b-col>
          <b-col v-else cols="3" class="m-0 p-1 border border-top-0">
            <b-form-input
              size="sm"
              id="form-compra-transporte-cnpj"
              type="text"
              autocomplete="off"
              v-model="compra.trans_cnpj"
              v-mask="'##.###.###/####-##'"
              required
              readonly
            />
          </b-col>
          <b-col cols="3" class="m-0 p-1 border border-top-0">
            <b-form-input
              size="sm"
              id="form-compra-transporte-ie"
              type="text"
              autocomplete="off"
              v-model="compra.trans_inscricao_estadual"
              required
              readonly
            />
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col class="container-com-borda" cols="8">Endereço </b-col>
          <b-col class="container-com-borda" cols="4">Cidade/UF</b-col>
        </b-row>
        <b-row class="border border-top-0 m-0 p-0">
          <b-col cols="8" class="m-0 p-1 border border-top-0">
            <b-form-input
              size="sm"
              id="form-compra-transporte-endereco"
              type="text"
              autocomplete="off"
              v-model="compra.trans_endereco"
              required
              readonly
            />
          </b-col>
          <b-col cols="4" class="m-0 p-1 border border-top-0">
            <b-form-input
              size="sm"
              id="form-compra-transporte-cidade-uf"
              type="text"
              autocomplete="off"
              v-model="compra.trans_cidade_uf"
              required
              readonly
            />
          </b-col>
          <b-col cols="12" class="m-0 mt-1 p-1">
            <b-alert show variant="warning" class="p-1 m-0 d-flex">
              <b-form-group class="p-0 m-0 flex-fill">
                <div class="d-flex ml-3">
                  <div class="text-nowrap mr-3" style="height: 28px">
                    Esta transportadora não possui cadastro, deseja cadastrá-la?
                  </div>
                  <b-form-radio
                    class="mr-3"
                    v-model="compra.novo_naocadastrar_referenciar"
                    name="novo-transporte"
                    value="cadastrar"
                    >Sim</b-form-radio
                  >
                  <b-form-radio
                    class="mr-3"
                    v-model="compra.novo_naocadastrar_referenciar"
                    name="nao-cadastrar-transporte"
                    value="naocadastrar"
                    >Não</b-form-radio
                  >
                </div>
              </b-form-group>
            </b-alert>
          </b-col>
        </b-row>
      </div>

      <h5><i class="fa fa-usd mr-1 mt-4"></i> Totais da nota</h5>
      <b-row class="m-0">
        <b-col class="container-com-borda" cols="2"
          >Base de Cálculo de ICMS
        </b-col>
        <b-col class="container-com-borda" cols="2">Valor do ICMS </b-col>
        <b-col class="container-com-borda" cols="2">Base de Cálculo ST </b-col>
        <b-col class="container-com-borda" cols="2">Valor do ICMS ST </b-col>
        <b-col class="container-com-borda" cols="2"
          >Total de Outras Despesas
        </b-col>
        <b-col class="container-com-borda" cols="2">Total dos produtos </b-col>
      </b-row>
      <b-row class="border border-top-0 m-0 p-0">
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <money
            class="form-control"
            v-bind="maskDinheiroSemRS"
            size="sm"
            id="form-compra-totais-base-calculo-icms"
            type="text"
            autocomplete="off"
            v-model="compra.base_calculo_icm"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <money
            class="form-control"
            v-bind="maskDinheiroSemRS"
            size="sm"
            id="form-compra-totais-valor-icms"
            type="text"
            autocomplete="off"
            v-model="compra.valor_icms"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <money
            class="form-control"
            v-bind="maskDinheiroSemRS"
            size="sm"
            id="form-compra-totais-base-calculo-st"
            type="text"
            autocomplete="off"
            v-model="compra.base_calculo_st"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <money
            class="form-control"
            v-bind="maskDinheiroSemRS"
            size="sm"
            id="form-compra-totais-valor-icms-st"
            type="text"
            autocomplete="off"
            v-model="compra.valor_icms_st"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <money
            class="form-control"
            v-bind="maskDinheiroSemRS"
            size="sm"
            id="form-compra-totais-total-outras-despesas"
            type="text"
            autocomplete="off"
            v-model="compra.total_outras_despesas"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <money
            class="form-control"
            v-bind="maskDinheiroSemRS"
            size="sm"
            id="form-compra-totais-total-produtos"
            type="text"
            autocomplete="off"
            v-model="compra.total_produtos"
            required
            readonly
          />
        </b-col>
      </b-row>
      <b-row class="m-0">
        <b-col class="container-com-borda" cols="2">Valor do frete </b-col>
        <b-col class="container-com-borda" cols="2">Desconto </b-col>
        <b-col class="container-com-borda" cols="2">Valor do IPI </b-col>
        <b-col class="container-com-borda" cols="2"
          >Peso Bruto - Liquido
        </b-col>
        <b-col class="container-com-borda" cols="2">Total da nota </b-col>
      </b-row>
      <b-row class="border border-top-0 m-0 p-0">
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <money
            class="form-control"
            v-bind="maskDinheiroSemRS"
            size="sm"
            id="form-compra-totais-valor-frete"
            type="text"
            autocomplete="off"
            v-model="compra.valor_frete"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <money
            class="form-control"
            v-bind="maskDinheiroSemRS"
            size="sm"
            id="form-compra-totais-desconto"
            type="text"
            autocomplete="off"
            v-model="compra.desconto"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <money
            class="form-control"
            v-bind="maskDinheiroSemRS"
            size="sm"
            id="form-compra-totais-valor-ipi"
            type="text"
            autocomplete="off"
            v-model="compra.valor_ipi"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            id="form-compra-totais-peso-bruto-liquido"
            type="text"
            autocomplete="off"
            v-model="compra.peso_bruto_liquido"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <money
            class="form-control"
            v-bind="maskDinheiroSemRS"
            size="sm"
            id="form-compra-totais-total-nota"
            type="text"
            autocomplete="off"
            v-model="compra.total_nota"
            required
            readonly
          />
        </b-col>
      </b-row>

      <h5><i class="fa fa-money mr-1 mt-4"></i> Duplicatas</h5>
      <b-row
        class="m-0"
        v-if="JSON.parse(compra.fatura_json_duplicatas).length > 0"
      >
        <b-col class="container-com-borda" cols="3">Duplicata </b-col>
        <b-col class="container-com-borda" cols="5">Data vencimento </b-col>
        <b-col class="container-com-borda" cols="4">Valor da parcela </b-col>
      </b-row>
      <b-row
        v-for="(duplicata, y) in JSON.parse(compra.fatura_json_duplicatas)"
        :key="'duplicata' + y"
        class="border border-top-0 m-0 p-0"
      >
        <b-col cols="3" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            :id="'form-compra-duplicata-nmr-duplicata-' + y"
            type="text"
            autocomplete="off"
            v-model="duplicata.cobr_dup_ndup"
            required
            readonly
          />
        </b-col>
        <div></div>
        <b-col cols="5" class="m-0 p-1 border border-top-0">
          <!-- FORMATA DATA -->
          <span v-show="false">
            {{
              (duplicata.cobr_dup_dvenc = formatDataBR(
                duplicata.cobr_dup_dvenc
              ))
            }}
          </span>
          <b-form-input
            size="sm"
            :id="'form-compra-duplicata-vencimento-' + y"
            type="text"
            autocomplete="off"
            v-model="duplicata.cobr_dup_dvenc"
            required
            readonly
          />
        </b-col>
        <b-col cols="4" class="m-0 p-1 border border-top-0">
          <money
            class="form-control"
            v-bind="maskDinheiroSemRS"
            :id="'form-compra-duplicata-valor-' + y"
            type="text"
            autocomplete="off"
            v-model="duplicata.cobr_dup_vdup"
            required
            readonly
          />
        </b-col>
      </b-row>
      <div class="d-flex">
        <h5><i class="fa fa-usd mr-1 mt-4"></i> Pagamento</h5>
        <b-button
          @click="addPagamento()"
          :disabled="mode === 'remove'"
          class="btn_addPagamentos"
          type="button"
          variant="primary"
        >
          Adicionar
        </b-button>
      </div>
      <b-row class="m-0">
        <b-col class="container-com-borda" cols="2">Vencimento* </b-col>
        <b-col class="container-com-borda" cols="2">Valor da parcela* </b-col>
        <b-col class="container-com-borda" cols="2">Forma de pagamento* </b-col>
        <b-col class="container-com-borda" cols="2">Plano de contas* </b-col>
        <b-col class="container-com-borda" cols="3">Observação </b-col>
        <b-col
          class="container-com-borda d-flex justify-content-center"
          cols="1"
          >Delete
        </b-col>
      </b-row>
      <b-row
        v-for="(pagamento, y) in dataPagamentos"
        :key="'pag' + y"
        class="border border-top-0 m-0 p-0"
      >
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <!-- FORMATA DATA -->
          <span v-show="false">
            {{
              (pagamento.cobr_dup_dvenc = formatDataBR(
                pagamento.cobr_dup_dvenc
              ))
            }}
          </span>
          <b-form-input
            size="sm"
            :id="'form-compra-pagamento-vencimento-' + y"
            type="text"
            autocomplete="off"
            v-model="pagamento.cobr_dup_dvenc"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            :id="'form-compra-pagamento-valor-parcela-' + y"
            type="text"
            autocomplete="off"
            v-model="pagamento.cobr_dup_vdup"
            required
            readonly
          />
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            :id="'form-compra-pagamento-forma-pagamento-' + y"
            type="text"
            autocomplete="off"
            v-model="pagamento.forma_pagamento"
            required
            list="my-list-formas-pagamentos"
          />
          <b-form-datalist
            :options="dataFormasPagamentos"
            id="my-list-formas-pagamentos"
          >
          </b-form-datalist>
        </b-col>
        <b-col cols="2" class="m-0 p-1 border border-top-0">
          <!-- SETA VALOR PADRÃO 'COMPRAS', CASO NAO TIVE SETADO AINDA -->
          <span v-show="false"
            >{{
              pagamento.plano_contas
                ? pagamento.plano_contas
                : (pagamento.plano_contas = "Compras")
            }}
          </span>
          <b-form-input
            size="sm"
            :id="'form-compra-pagamento-plano-contas-' + y"
            type="text"
            autocomplete="off"
            v-model="pagamento.plano_contas"
            required
            list="my-list-planos-contas"
            :class="{
              'is-invalid': !state(
                dataPlanoContas.includes(pagamento.plano_contas)
              ),
            }"
          />
          <b-form-datalist
            :options="dataPlanoContas"
            id="my-list-planos-contas"
          >
          </b-form-datalist>
        </b-col>
        <b-col cols="3" class="m-0 p-1 border border-top-0">
          <b-form-input
            size="sm"
            :id="'form-compra-pagamento-obsercacao-' + y"
            type="text"
            autocomplete="off"
            v-model="pagamento.pagamento_obervacao"
            required
            readonly
          />
        </b-col>
        <b-col
          cols="1"
          class="
            m-0
            p-1
            border border-top-0
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <b-button
            @click="removePagamento(y)"
            :disabled="mode === 'remove'"
            size="sm"
            type="button"
            variant="danger"
            class="btn-remove-mercadoria"
          >
            X
          </b-button>
        </b-col>
      </b-row>

      <div class="btn-confirma-excluir-compra">
        <hr />
        <b-button variant="success" v-if="mode === 'Compra'" @click="save()">
          Finalizar
        </b-button>
        <b-button
          variant="danger"
          v-if="mode === 'remove'"
          @click="$emit('excluirRegistro')"
        >
          Excluir <i class="ml-3 fa fa-trash-o fa-lg" aria-hidden="true"></i>
        </b-button>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import moment from "moment";
import { baseApiUrl, showError } from "@/../global";
import axios from "axios";

export default {
  name: "FormularioCompra",
  props: ["compra", "mode"],
  data() {
    return {
      dataProdutos: [],
      dataPagamentos: [],
      dataFormasPagamentos: [
        "A Combinar",
        "Boleto Bancário",
        "Carnê",
        "Cartão de Crédito",
        "Cartão de Débito",
        "Cheque",
        "Devolução de Mercadorias",
        "Dinheiro à Vista",
        "Dinheiro Parcelado",
        "PIX",
        "Transferência Bancária",
      ],
      dataPlanoContas: [
        "Aluguel",
        "Assessorias e associações",
        "Cartório",
        "Combustivel e translados",
        "Confraternizações",
        "Contabilidade",
        "Correios",
        "Cursos e treinamentos",
        "Distribuição de lucros",
        "Empréstimos",
        "Encargos funcionários - 13o salário",
        "Encargos funcionários - alimentação",
        "Encargos funcionários - assist. médica e odontol.",
        "Encargos funcionários - exames pré e demissionais",
        "Encargos funcionários - FGTS",
        "Encargos funcionarios - horas extras",
        "Encargos funcionários - INSS",
        "Encargos funcionários - vale transporte",
        "Encargos - rescisões trabalhistas",
        "Energia elétrica + água",
        "Impostos - alvará",
        "Impostos - coleta de lixo",
        "Impostos - IPTU",
        "Impostos - PIS",
        "Licença ou aluguel de softwares",
        "Limpeza",
        "Manutenção equipamentos",
        "Marketing e publicidade",
        "Material de escritório",
        "Material reforma",
        "Remuneração funcionários",
        "Segurança",
        "Supermercado",
        "Telefonia e internet",
        "Transportadora",
        "Viagens",
        "Comissão de vendedores",
        "Compras",
        "Impostos - COFINS",
        "Impostos - CSSL",
        "Impostos - ICMS",
        "Impostos - importação IPI",
        "Impostos - IRPJ",
        "Impostos - ISS",
        "Despesas bancárias",
        "Aquisição de equipamentos",
        "Adiantamento - funcionários",
        "Ajuste de caixa",
      ],
      dataMercadoriaFromDB: [],

      maskDinheiroSemRS: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        masked: false,
      },
      maskInteiro: {
        decimal: ",",
        thousands: ".",
        precision: 0,
        masked: false,
      },
    };
  },
  methods: {
    formatDataBR(date) {
      return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    addPagamento() {
      this.dataPagamentos.push({
        cobr_dup_dvenc: "",
        cobr_dup_vdup: "",
        forma_pagamento: "",
        plano_contas: "Compras",
        pagamento_obervacao: "",
      });
    },
    removePagamento(index) {
      this.dataPagamentos.splice(index, 1);
    },
    save() {
      console.log(this.dataProdutos);
      console.log(this.compra);
      console.log(this.dataPagamentos);
    },
    state(elemento) {
      return elemento;
    },
    mercadoriaReferenciadaValida(mercadoria, index) {
      if (!this.dataMercadoriaFromDB.includes(mercadoria)) {
        this.dataProdutos[index].mercadoria_referenciada = "";
        return;
      } else {
        console.log(mercadoria.replace(/.*#(.*)#.*/, '$1'));
        /*  CARREGA A MERCADORIA SELECIONADA NO CAMPO DE MERCADORIA REFERENCIADA*/
        /* const idCompra = this.compra.codigo_compra;
        const url = `${baseApiUrl}/cadastro_compras_mercadorias/${idCompra}`;
        axios
          .get(url)
          .then((res) => {
            this.dataProdutos = res.data;
            this.dataPagamentos = JSON.parse(
              this.compra.fatura_json_duplicatas
            );
          })
          .catch(showError); */
      }
    },
  },
  created() {
    if (this.compra.codigo_compra) {
      /*  CARREGA AS MERCADORIAS DA COMPRA*/
      const idCompra = this.compra.codigo_compra;
      const url = `${baseApiUrl}/cadastro_compras_mercadorias/${idCompra}`;
      axios
        .get(url)
        .then((res) => {
          this.dataProdutos = res.data;
          this.dataPagamentos = JSON.parse(this.compra.fatura_json_duplicatas);
        })
        .catch(showError);
    }
    /*  CARREGA AS MERCADORIAS  JA CADASTRADAS */
    const urlMercoriaFromDB = `${baseApiUrl}/cadastro_compras_mercadoria_from_db`;
    axios
      .get(urlMercoriaFromDB)
      .then((res) => {
        this.dataMercadoriaFromDB = res.data;
      })
      .catch(showError);
  },
};
</script>

<style>
.formulario-compras .form-cadastros-form-compra .container-com-borda {
  border: 1px solid #dee2e6 !important;
  padding: 4px;
}
.formulario-compras .form-cadastros-form-compra {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 300px;
}
.formulario-compras .form-cadastros-compras h5 {
  font-size: 18px;
}
.formulario-compras .css-index-item {
  height: 289px;
  padding: 0px 8px;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(218, 218, 216);
  border: solid 1px rgb(184, 181, 181);
}
.formulario-compras .css-container-item {
  margin-bottom: 10px;
  border: solid 1px rgb(175, 173, 173);
  padding: 2px;
}
.formulario-compras .form-cadastros-compras fieldset {
  margin-bottom: 5px;
}

.formulario-compras .btn-remove-mercadoria {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  text-align: center;
  height: 27px;
  padding: 8px;
  background-color: rgb(245, 96, 99);
  font-size: 13px;
  font-weight: 600;
}
.formulario-compras .btn-add-outro-produto {
  padding: 5px;
}
.formulario-compras .btn-add-outro-produto button {
  padding: 6px;
  font-size: 12px;
  font-weight: 600;
  background-color: rgba(76, 73, 84, 0.953);
}

.formulario-compras .btn-somar-ao-total {
  padding: 0px 0px 0px 8px;
  display: flex;
  justify-content: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
  text-align: center;
  background-color: rgba(133, 132, 132, 0.042);
  border: solid 1px rgb(194, 194, 194);
}
.formulario-compras .btn-somar-ao-total:hover {
  background-color: rgba(133, 132, 132, 0.391);
}
.formulario-compras .btn-somar-ao-total label {
  padding-top: 5px;
  padding-right: 7px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.631);
}
.formulario-compras .form-cadastros-form-compra .form-control:disabled,
.form-control[readonly] {
  background-color: rgb(247, 247, 247);
}
.formulario-compras .form-control {
  height: calc(1.3em + 0.5rem + 2px);
  padding: 0px 4px;
  font-size: 12px;
  border-radius: 0.2rem;
}

.formulario-compras .btn_addPagamentos {
  padding: 0px 7px;
  font-size: 11px;
  height: 20px;
  display: flex;
  align-content: center;
  align-items: center;
  margin-top: 25px;
  margin-left: 5px;
}
.formulario-compras .btn-confirma-excluir-compra {
  width: 100%;
  padding: 50px;
}
.formulario-compras .btn-confirma-excluir-compra button {
  width: 100%;
  font-weight: 700;
}
</style>