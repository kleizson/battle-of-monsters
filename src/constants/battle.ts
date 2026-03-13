/** Dano mínimo aplicado quando ataque - defesa <= 0. */
export const MIN_DAMAGE = 1;

/** HP padrão quando o valor não está disponível (ex.: antes da batalha iniciar). */
export const DEFAULT_HP_FALLBACK = 100;

/** Delays de animação da batalha (ms). */
export const BATTLE_DAMAGE_FLASH_MS = 400;
export const BATTLE_STEP_DURATION_MS = 900;
export const BATTLE_NEXT_STEP_DELAY_MS = 500;

/** Limiares de HP (%) para cores da barra: <= LOW = vermelho, <= MEDIUM = amarelo, > MEDIUM = verde. */
export const HP_BAR_LOW_PERCENT = 30;
export const HP_BAR_MEDIUM_PERCENT = 60;
