import type { ChangeEvent } from "react";
import toast from "react-hot-toast";
import type { IMonster } from "../../types/monster";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MonsterStatsPreview } from "./MonsterStats";
import { StatInput } from "../ui/StatInput";
import { FormField } from "../ui/FormField";
import { MONSTER_STAT_DISPLAY } from "../../constants/monsterStats";
import { FORM_LABEL_CLASS, FORM_INPUT_CLASS, MODAL_BUTTON_BASE } from "../../constants/styles";
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

function getMonsterAddedToastMessage(monster: IMonster): string {
  const name = monster.name.trim();
  return `${name} adicionado ao feed!`;
}

export default function CharacterCreationModal({ monster, handleChange, createMonster, isOpen, close }: CharacterCreationModalProps) {
  const valid = isFormValid(monster);

  const handleCreateMonster = (closeAfter: boolean) => {
    if (!valid) return;
    createMonster();
    toast.success(getMonsterAddedToastMessage(monster));
    if (closeAfter) close();
  };

  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

      <div className="fixed inset-0 flex items-end sm:items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <DialogPanel className="w-full max-w-md sm:max-w-lg max-h-[90dvh] sm:max-h-[92vh] mx-auto p-4 sm:p-6 bg-slate-800 rounded-t-2xl sm:rounded-lg shadow-xl shadow-black/20 border border-slate-700 relative overflow-y-auto overscroll-contain">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-100 truncate min-w-0">Status do Personagem</h2>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="shrink-0 p-2 -m-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800 touch-manipulation"
            >
              <span className="text-2xl leading-none" aria-hidden>×</span>
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <FormField
              id="name"
              name="name"
              label="Nome"
              value={monster.name}
              onChange={handleChange}
              placeholder="Ex: Pikachu"
              labelClass={FORM_LABEL_CLASS}
              inputClass={FORM_INPUT_CLASS}
            />

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
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

            <FormField
              id="image_url"
              name="image_url"
              label="URL da imagem"
              type="url"
              value={monster.image_url}
              onChange={handleChange}
              placeholder="https://exemplo.com/imagem.png"
              labelClass={FORM_LABEL_CLASS}
              inputClass={FORM_INPUT_CLASS}
            />
          </form>

          <div className="bg-slate-800/80 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-600 self-start mt-4 sm:mt-6">
            <h3 className="text-base sm:text-xl font-semibold mb-4 sm:mb-6 text-slate-100">Visualização em Tempo Real</h3>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-slate-700 rounded-xl sm:rounded-2xl border border-slate-600 flex items-center justify-center overflow-hidden shadow-inner">
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

              <div className="flex-1 w-full min-w-0 space-y-3">
                <p className="text-base sm:text-lg font-bold text-slate-100 break-words">
                  {monster.name || ""}
                </p>

                <MonsterStatsPreview monster={monster} />
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              disabled={!valid}
              onClick={() => handleCreateMonster(true)}
              className={`${MODAL_BUTTON_BASE} bg-blue-600 hover:bg-blue-500 focus:ring-blue-500`}
            >
              Criar monstro
            </button>
            <button
              type="button"
              disabled={!valid}
              onClick={() => handleCreateMonster(false)}
              className={`${MODAL_BUTTON_BASE} bg-slate-600 hover:bg-slate-500 focus:ring-slate-500 border border-slate-500`}
            >
              Criar e Adicionar Outro
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
