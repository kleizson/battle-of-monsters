import './App.css';
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
