import { NextResponse } from "next/server";
// Importamos o HttpsProxyAgent para forçar a requisição a passar pelo proxy
import { HttpsProxyAgent } from "https-proxy-agent";

export async function GET() {
  try {
    const apiToken = process.env.CLASH_OF_CLANS_TOKEN;
    const proxyUrl = process.env.FIXIE_URL; // URL fornecida pelo Fixie

    if (!apiToken || !proxyUrl) {
      return NextResponse.json({ error: "Configurações ausentes" }, { status: 500 });
    }

    // Criamos o agente que vai "disfarçar" nosso IP
    const agent = new HttpsProxyAgent(proxyUrl);

    // Fazemos a requisição para a API oficial da Supercell usando o agente
    const response = await fetch("https://api.clashofclans.com/v1/clans/%23TAG_DO_CLAN", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Accept: "application/json",
      },
      // Passamos o agente configurado (nota: no fetch nativo do Node 18+, usa-se a biblioteca 'undici' ou 'https-proxy-agent')
      // Para fins de simplificação com pacotes padrão:
      agent: agent 
    } as any);

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
  }
}