"use server"

import { searchAll } from ".";

export async function searchSSR(
  search: string
): Promise<{ success: boolean; error?: string; data?: any }> {

  try {
    const locale = "pt"; 
    const data = await searchAll(locale, search);
    return { success: true, data };
  } catch (error) {
    console.error("Failed:", error);
    return { success: false, error: "Erro ao buscar dados." };
  }
}
