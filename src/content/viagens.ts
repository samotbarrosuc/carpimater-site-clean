/**
 * ============================================================
 * ZONAS DE SERVIÇO — DISTÂNCIAS E PORTAGENS
 * ============================================================
 *
 * Edite aqui os concelhos servidos e os custos de deslocação.
 *
 *   - distrito      → nome do distrito
 *   - concelho      → nome do concelho
 *   - distance_km   → distância em km desde a base (Cantanhede)
 *   - toll_eur      → custo de portagens numa ida (€)
 *
 * Para ADICIONAR um concelho: copie uma linha existente e edite os valores.
 * Para REMOVER um concelho: apague o objeto inteiro { ... }.
 *
 * NOTA: O custo total de portagens é sempre calculado x2 (ida + volta).
 * ============================================================
 */

export interface TravelEntry {
  distrito: string
  concelho: string
  /** Distância em km desde a base */
  distance_km: number
  /** Custo de portagens numa ida (€) */
  toll_eur: number
}

export const TRAVEL_DATA: TravelEntry[] = [

  // ──────────────────────────────────────────────────────────
  // DISTRITO DE AVEIRO
  // ──────────────────────────────────────────────────────────
  { distrito: 'Aveiro', concelho: 'Águeda',                distance_km: 40,  toll_eur: 0   },
  { distrito: 'Aveiro', concelho: 'Albergaria-a-Velha',    distance_km: 65,  toll_eur: 4.0 },
  { distrito: 'Aveiro', concelho: 'Anadia',                distance_km: 28,  toll_eur: 0   },
  { distrito: 'Aveiro', concelho: 'Arouca',                distance_km: 95,  toll_eur: 6.5 },
  { distrito: 'Aveiro', concelho: 'Aveiro',                distance_km: 46,  toll_eur: 2.5 },
  { distrito: 'Aveiro', concelho: 'Castelo de Paiva',      distance_km: 100, toll_eur: 7.0 },
  { distrito: 'Aveiro', concelho: 'Espinho',               distance_km: 90,  toll_eur: 6.5 },
  { distrito: 'Aveiro', concelho: 'Estarreja',             distance_km: 55,  toll_eur: 3.5 },
  { distrito: 'Aveiro', concelho: 'Ílhavo',                distance_km: 48,  toll_eur: 2.5 },
  { distrito: 'Aveiro', concelho: 'Mealhada',              distance_km: 20,  toll_eur: 0   },
  { distrito: 'Aveiro', concelho: 'Murtosa',               distance_km: 55,  toll_eur: 2.5 },
  { distrito: 'Aveiro', concelho: 'Oliveira de Azeméis',   distance_km: 80,  toll_eur: 5.0 },
  { distrito: 'Aveiro', concelho: 'Oliveira do Bairro',    distance_km: 32,  toll_eur: 0   },
  { distrito: 'Aveiro', concelho: 'Ovar',                  distance_km: 75,  toll_eur: 5.0 },
  { distrito: 'Aveiro', concelho: 'Santa Maria da Feira',  distance_km: 85,  toll_eur: 6.0 },
  { distrito: 'Aveiro', concelho: 'São João da Madeira',   distance_km: 85,  toll_eur: 6.0 },
  { distrito: 'Aveiro', concelho: 'Sever do Vouga',        distance_km: 70,  toll_eur: 0   },
  { distrito: 'Aveiro', concelho: 'Vagos',                 distance_km: 31,  toll_eur: 1.5 },
  { distrito: 'Aveiro', concelho: 'Vale de Cambra',        distance_km: 85,  toll_eur: 6.0 },

  // ──────────────────────────────────────────────────────────
  // DISTRITO DE COIMBRA
  // ──────────────────────────────────────────────────────────
  { distrito: 'Coimbra', concelho: 'Arganil',              distance_km: 80,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Cantanhede',           distance_km: 0,   toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Coimbra',              distance_km: 25,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Condeixa-a-Nova',      distance_km: 35,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Figueira da Foz',      distance_km: 40,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Góis',                 distance_km: 85,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Lousã',                distance_km: 45,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Mira',                 distance_km: 20,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Miranda do Corvo',     distance_km: 45,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Montemor-o-Velho',     distance_km: 30,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Oliveira do Hospital', distance_km: 95,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Pampilhosa da Serra',  distance_km: 100, toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Penacova',             distance_km: 40,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Penela',               distance_km: 55,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Soure',                distance_km: 45,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Tábua',                distance_km: 75,  toll_eur: 0 },
  { distrito: 'Coimbra', concelho: 'Vila Nova de Poiares', distance_km: 50,  toll_eur: 0 },

  // ──────────────────────────────────────────────────────────
  // DISTRITO DE LEIRIA
  // ──────────────────────────────────────────────────────────
  { distrito: 'Leiria', concelho: 'Alcobaça',              distance_km: 105, toll_eur: 8.0  },
  { distrito: 'Leiria', concelho: 'Alvaiázere',            distance_km: 85,  toll_eur: 0    },
  { distrito: 'Leiria', concelho: 'Ansião',                distance_km: 70,  toll_eur: 0    },
  { distrito: 'Leiria', concelho: 'Batalha',               distance_km: 90,  toll_eur: 6.0  },
  { distrito: 'Leiria', concelho: 'Bombarral',             distance_km: 130, toll_eur: 10.0 },
  { distrito: 'Leiria', concelho: 'Caldas da Rainha',      distance_km: 120, toll_eur: 9.0  },
  { distrito: 'Leiria', concelho: 'Castanheira de Pera',   distance_km: 85,  toll_eur: 0    },
  { distrito: 'Leiria', concelho: 'Figueiró dos Vinhos',   distance_km: 75,  toll_eur: 0    },
  { distrito: 'Leiria', concelho: 'Leiria',                distance_km: 85,  toll_eur: 6.0  },
  { distrito: 'Leiria', concelho: 'Marinha Grande',        distance_km: 75,  toll_eur: 3.0  },
  { distrito: 'Leiria', concelho: 'Nazaré',                distance_km: 95,  toll_eur: 4.0  },
  { distrito: 'Leiria', concelho: 'Óbidos',                distance_km: 120, toll_eur: 9.0  },
  { distrito: 'Leiria', concelho: 'Pedrógão Grande',       distance_km: 85,  toll_eur: 0    },
  { distrito: 'Leiria', concelho: 'Peniche',               distance_km: 135, toll_eur: 10.0 },
  { distrito: 'Leiria', concelho: 'Pombal',                distance_km: 55,  toll_eur: 4.0  },
  { distrito: 'Leiria', concelho: 'Porto de Mós',          distance_km: 90,  toll_eur: 6.0  },
]

// ─── Funções utilitárias (não editar) ─────────────────────────────────────────

/** Lista de distritos disponíveis (ordenados alfabeticamente) */
export const DISTRITOS = [...new Set(TRAVEL_DATA.map(t => t.distrito))].sort()

/** Concelhos de um distrito (ordenados alfabeticamente) */
export function getConcelhosByDistrito(distrito: string): string[] {
  return TRAVEL_DATA
    .filter(t => t.distrito === distrito)
    .map(t => t.concelho)
    .sort()
}

/** Dados de viagem para um concelho específico */
export function getTravelEntry(distrito: string, concelho: string): TravelEntry | undefined {
  return TRAVEL_DATA.find(t => t.distrito === distrito && t.concelho === concelho)
}
