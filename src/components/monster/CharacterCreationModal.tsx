import type { ChangeEvent } from "react";
import type { IMonster } from "../../types/monster";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MonsterStatsPreview } from "./MonsterStats";
import { StatInput } from "../ui/StatInput";
import { MONSTER_STAT_DISPLAY } from "../../constants/monsterStats";
import { FORM_LABEL_CLASS, FORM_INPUT_CLASS } from "../../constants/styles";
import { PLACEHOLDER_IMAGE_ERROR_URL } from "../../constants/monster";

interface CharacterCreationModalProps {
  monster: IMonster;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  createMonster: () => void;
  isOpen: boolean;
  close: () => void;
}

function isFormValid(monster: IMonster): boolean {
  const nameTrimmed = monster.name.trim();
  const statsValid =
    Number.isFinite(monster.attack) && monster.attack > 0 &&
    Number.isFinite(monster.defense) && monster.defense > 0 &&
    Number.isFinite(monster.speed) && monster.speed > 0 &&
    Number.isFinite(monster.hp) && monster.hp > 0;
  return nameTrimmed.length > 0 && statsValid;
}

export default function CharacterCreationModal({ monster, handleChange, createMonster, isOpen, close }: CharacterCreationModalProps) {
  const valid = isFormValid(monster);

  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <DialogPanel className="w-full max-w-md mx-auto p-6 bg-slate-800 rounded-lg shadow-xl shadow-black/20 border border-slate-700 relative">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-slate-100">Status do Personagem</h2>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="shrink-0 p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              <span className="text-xl leading-none" aria-hidden>×</span>
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className={FORM_LABEL_CLASS}>Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={monster.name}
                onChange={handleChange}
                className={FORM_INPUT_CLASS}
                placeholder="Ex: Pikachu"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {MONSTER_STAT_DISPLAY.map(({ key, label }) => (
                <StatInput
                  key={key}
                  id={key}
                  name={key}
                  label={label}
                  value={monster[key]}
                  onChange={handleChange}
                  labelClass={FORM_LABEL_CLASS}
                  inputClass={FORM_INPUT_CLASS}
                />
              ))}
            </div>

            <div>
              <label htmlFor="image_url" className={FORM_LABEL_CLASS}>URL da imagem</label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={monster.image_url}
                onChange={handleChange}
                className={FORM_INPUT_CLASS}
                placeholder="https://exemplo.com/imagem.png"
              />
            </div>

          </form>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-600 self-start mt-6">
            <h3 className="text-xl font-semibold mb-6 text-slate-100">Visualização em Tempo Real</h3>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-32 h-32 flex-shrink-0 bg-slate-700 rounded-2xl border border-slate-600 flex items-center justify-center overflow-hidden shadow-inner">
                {monster.image_url ? (
                  <img
                    src={monster.image_url}
                    alt={monster.name ? `Preview do monstro ${monster.name}` : "Preview do monstro"}
                    className="h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE_ERROR_URL;
                    }}
                  />
                ) : (
                  <div className="text-5xl text-slate-500">❓</div>
                )}
              </div>

              <div className="flex-1 w-full space-y-3">
                <p className="text-lg font-bold text-slate-100 break-words">
                  {monster.name || ""}
                </p>

                <MonsterStatsPreview monster={monster} />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              disabled={!valid}
              onClick={() => {
                if (!valid) return;
                createMonster();
                close();
              }}
              className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              Criar monstro
            </button>
            <button
              type="button"
              disabled={!valid}
              onClick={() => {
                if (!valid) return;
                createMonster();
              }}
              className="flex-1 cursor-pointer bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800 border border-slate-500"
            >
              Criar e Adicionar Outro
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
