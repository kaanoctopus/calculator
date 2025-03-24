import { useCalculatorController } from './controllers/useCalculatorController';
import Display from './components/Display';
import Keypad from './components/Keypad';
import History from './components/History';
import useKeyboard from './hooks/useKeyboard';

export default function App() {
  const {
    expression,
    result,
    history,
    handleKeyPress,
    handleClearHistory,
  } = useCalculatorController();

  useKeyboard(handleKeyPress);

  return (
    <div className="max-w-sm w-full mx-auto mt-10 p-4 rounded-3xl bg-white shadow-2xl flex flex-col gap-2">
      <History items={history} onClear={handleClearHistory} />
      <Display value={result || expression} />
      <Keypad onKeyPress={handleKeyPress} />
    </div>
  );
}
