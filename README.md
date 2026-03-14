# 🐉 Battle of Monsters

Um jogo onde você cria seus monstros, escolhe dois para brigar e assiste à batalha turno a turno. Quem tiver os melhores stats leva a melhor!

---

## ✨ Funcionalidades

- **🦴 Criação de monstros** — Modal para cadastrar personagens com nome, HP, ataque, defesa, velocidade e URL de imagem; opções "Criar monstro" (fecha o modal) e "Criar e Adicionar Outro" (mantém aberto para cadastrar vários em sequência).
- **🔔 Feedback** — Toasts (react-hot-toast) ao adicionar monstro ao feed.
- **⚔️ Seleção para batalha** — Lista de monstros criados com seleção de atacante e defensor (clique para alternar).
- **🎮 Simulação de batalha** — Combate turno a turno: ordem de ataque por velocidade (desempate por ataque), dano = ataque − defesa (mínimo 1), animação de golpe e barras de HP.
- **📱 Interface responsiva** — Layout com Tailwind CSS e componentes acessíveis (Headless UI).

---

## 🛠️ Stack e ferramentas

| Tecnologia | Uso |
|------------|-----|
| **React 19** | UI e hooks |
| **TypeScript** | Tipagem e contratos |
| **Vite 7** | Build e dev server |
| **Tailwind CSS 4** | Estilos |
| **Headless UI** | Modal e componentes acessíveis |
| **react-hot-toast** | Notificações toast |
| **ESLint** | Linting |

---

## 🏗️ Arquitetura do projeto

O código está organizado para separar **regras de negócio** da **camada de UI**:

```
src/
├── domain/           # Lógica pura (sem React)
│   ├── monster/      # BattleMonster, mapeamento IMonster → BattleMonster
│   └── battle/       # BattleSimulator — simulação completa da batalha
├── types/            # Interfaces e tipos (monster, battle)
├── constants/        # Constantes (battle, monster, monsterStats, estilos)
├── hooks/            # useMonsters, useCharacterCreationModal, useBattleSelection, useBattleController, etc.
├── components/       # UI por domínio (monster, battle, ui — FormField, StatInput, etc.)
└── App.tsx           # Composição e orquestração
```

- **📦 Domain**: `BattleSimulator` recebe dois `BattleMonster`, roda a batalha em memória e devolve um log de passos. Toda a fórmula de dano e ordem de turno fica aqui, testável sem React.
- **🪝 Hooks**: encapsulam estado e efeitos (lista de monstros, seleção para batalha, controle da animação passo a passo).
- **🧩 Components**: recebem dados e callbacks via props; a lógica fica nos hooks e no domain.

---

## 🚀 Como rodar

Requisitos: **Node.js** (recomendado 18+).

```bash
# Instalar dependências
npm install

# Desenvolvimento (com hot reload)
npm run dev
```

Após `npm run dev`, abra o endereço exibido no terminal (geralmente `http://localhost:5173`) 🌐
