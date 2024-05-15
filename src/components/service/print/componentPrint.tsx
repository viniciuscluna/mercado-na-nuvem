import { forwardRef, useMemo } from "react";
import { Produto } from "../../../domain/produto";
import { ETipoMedidaItem } from "../../../domain/ETipoMedidaItem";
import { currencyFormat } from "../../../utils/currencyFormater";

import "./componentPrint.scss";
import { OrdemVenda } from "../../../domain/ordemVenda";
import { cpfFormater } from "../../../utils/cpfFormater";
import { phoneFormater } from "../../../utils/phoneFormater";
import { cnpjFormater } from "../../../utils/cnpjFormater";

const DEFAULT_LOGO = 'https://i.imgur.com/Xbxq1f2.png';

type ComponentPrintProp = {
  ordemVenda: OrdemVenda;
};

const ComponentPrint = forwardRef<HTMLElement, ComponentPrintProp>(
  ({ ordemVenda }: ComponentPrintProp, ref) => {
    const totalProduto = useMemo(
      () =>
        ordemVenda?.produtos?.reduce(
          (accumulator, currentValue) => accumulator + currentValue.valor_Venda,
          0
        ) || 0,
      [ordemVenda.produtos]
    );

    const formatCpf = cpfFormater;
    const formatTel = phoneFormater;
    const formatCnpj = cnpjFormater;

    const produtoAgrupado = useMemo(
      () =>
        (ordemVenda.produtos &&
          ordemVenda.produtos.reduce(
            (g: { [id: string]: Produto[] }, o: Produto) => {
              g[o.nome || ""] = g[o.nome || ""] || []; //check if key allready exists, else init a new array
              g[o.nome || ""].push(o); //add item to array
              return g; // be sure to return, or g will be undefined in next loop
            },
            {} //a second parameter to the reduce function, important to init the returned object
          )) ||
        [],
      [ordemVenda.produtos]
    );
    return (
      <section className="prestacao-print-model" ref={ref}>
        <main>
          <section className="header_document">
            <img

              src={ordemVenda.prestador?.logo ?? DEFAULT_LOGO}
              alt="Logo da Minha Empresa"
              className="logo"
            />
            <p>
              {ordemVenda.prestador?.cnpj ? formatCnpj(ordemVenda.prestador.cnpj) : cpfFormater(ordemVenda.prestador?.cpf ?? "")}
              <br />
              {ordemVenda.prestador?.endereco}
              <br />
              {formatTel(ordemVenda.prestador?.telefone ?? "")}
              <br />
              <b>{ordemVenda.prestador?.emailEmpresa}</b>
            </p>
          </section>

          <div className="container">
            <table className="order-details">
              <th style={{ textAlign: "center" }} colSpan={5}>
                <h4>{ordemVenda.prestador?.nome} - ({ordemVenda.referencia})</h4>

              </th>
              <tr>
                <td><b>Cliente Identificado: </b>{ordemVenda.cpf ? "Sim" : "Não"}</td>
              </tr>
              <tr>
                <td><b>CPF: </b>{formatCpf(ordemVenda.cpf ?? "")}</td>
                <td><b>Nome: </b>{ordemVenda.cliente?.nome ?? ""}</td>
                <td><b>E-mail: </b>{ordemVenda.cliente?.email ?? ""}</td>
                <td><b>Telefone: </b>{formatTel(ordemVenda.cliente?.telefone ?? "")}</td>
                <td><b>Endereço: </b>{ordemVenda.cliente?.endereco ?? ""}</td>
              </tr>

            </table>

            <table>
              <th style={{ textAlign: "center" }} colSpan={3}>
                <h4>Forma de Pagamento</h4>
              </th>
              <tbody>
                <tr>
                  <th>Tipo</th>
                  <th>Parcela </th>
                  <th>Valor Total (R$)</th>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td> {currencyFormat(totalProduto)}</td>
                </tr>


              </tbody>
            </table>
            <br></br>
            <table>
              <table>
                <th style={{ textAlign: "center" }} colSpan={6}>
                  <h4>Produtos</h4>
                </th>
                <tr>
                  <th>Qtd.</th>
                  <th>Un.</th>
                  <th>Peso</th>
                  <th>Produto</th>
                  <th>Unitário (R$)</th>
                  <th>Total (R$)</th>
                </tr>
                <tbody>
                  {Object.keys(produtoAgrupado).map((produto, index) => {
                    const arr = produtoAgrupado[produto];
                    const first = arr[0];
                    const total =
                      arr.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue.valor_Venda,
                        0
                      ) || 0;
                    return (
                      <tr key={index}>
                        <td>{arr.length}</td>
                        <td>
                          {first.tipoMedidaItem === ETipoMedidaItem.Litro
                            ? "Litro"
                            : "Kg/Grm"}
                        </td>
                        <td>{first.peso}</td>
                        <td>
                          {first.marca} - {first.modelo}
                        </td>
                        <td>{currencyFormat(first.valor_Venda)}</td>
                        <td>{currencyFormat(total)}</td>
                      </tr>
                    );
                  })}


                </tbody>
              </table>
            </table>

            <br />

            <footer className="footer">
              <p>Este não é um documento oficial de nota fiscal ou até mesmo cupom fiscal, este documento é apenas um comprovante simples da ordem de venda criada.</p>
              <p>Documento gerado pelo Mercado Na Nuvem 😎</p>

            </footer>
          </div>
        </main>
      </section>
    );
  }
);
export default ComponentPrint;
