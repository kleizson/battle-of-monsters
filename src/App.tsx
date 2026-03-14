import './App.css';
import { Toaster } from 'react-hot-toast';
import { CharacterCreationModal, MonsterSelectionPanel } from './components/monster';
import { BattleSection } from './components/battle';
import { useMonsters, useCharacterCreationModal } from './hooks';
import { useBattleSelection } from './hooks/battle';

function App() {
  const { monster, monsterList, handleChange, createMonster } = useMonsters();
  const { isOpen, openModal, closeModal } = useCharacterCreationModal();
  const {
    attacker,
    defender,
    selectedIndexes,
    toggleSelection,
  } = useBattleSelection(monsterList);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            border: "1px solid #475569",
            borderRadius: "0.75rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          },
          success: {
            iconTheme: { primary: "#10b981", secondary: "#0f172a" },
          },
        }}
      />
      <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
        <MonsterSelectionPanel
          monsters={monsterList}
          selectedIndexes={selectedIndexes}
          onToggleSelect={toggleSelection}
          onClickCreateMonster={openModal}
        />

        <BattleSection attacker={attacker} defender={defender} />
      </div>

      <CharacterCreationModal
        createMonster={createMonster}
        monster={monster}
        handleChange={handleChange}
        isOpen={isOpen}
        close={closeModal}
      />
    </>
  );
}

export default App;
