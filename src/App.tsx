import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Plus, Sword } from "lucide-react";
import MonsterSlot from "./components/ui/monster-slot";
import { Button } from "./components/ui/button";
import RegisterForm from "./components/ui/register-monster";
import BattleLogArea from "./components/ui/battle-log";
import type { BattleLog, MonsterBattle } from "./types/monster";


const App = () => {
  const [monster, setMonster] = useState<MonsterBattle[]>([])
  const [battleLog, setBattleLog] = useState<BattleLog[]>([])
  const [isBattling, setIsBattling] = useState(false)
  const [winner, setWinner] = useState<MonsterBattle | null>(null)


  const handleRegister = (newMonster: MonsterBattle) => {
    setMonster((prev) => [...prev, newMonster]);
  };


  const orderMonster = (a: MonsterBattle, b: MonsterBattle): [MonsterBattle, MonsterBattle] => {
    if (a.speed > b.speed) return [a, b]
    if (b.speed > a.speed) return [b, a]

    return a.attack >= b.attack ? [a, b] : [b, a]
  }

  const calculateDamage = (attack: number, defense: number) => {
    const damage = attack - defense
    return damage > 0 ? damage : 1
  }

  const executeBattle =  () => {
    const monsterOne = monster[0];
    const monsterTwo = monster[1];

    const [attacker, defender] = orderMonster(monsterOne, monsterTwo);

    let hpOne = attacker.hp;
    let hpTwo = defender.hp;

    const log: BattleLog[] = [];
    let round = 1;

    while (hpOne > 0 && hpTwo > 0) {
      const damageOne = calculateDamage(attacker.attack, defender.defense);
      hpTwo -= damageOne;
      log.push({
        round,
        attacker: attacker.name,
        defender: defender.name,
        damage: damageOne,
        defenderHpAfter: Math.max(hpTwo, 0),
      });

      if (hpTwo <= 0) break;

      const damageTwho = calculateDamage(defender.attack, attacker.defense);
      hpOne -= damageTwho;
      log.push({
        round,
        attacker: defender.name,
        defender: attacker.name,
        damage: damageTwho,
        defenderHpAfter: Math.max(hpOne, 0),
      });

      round++;

    }

    const winner = hpOne > 0 ? attacker : defender;
    setBattleLog(log);
    setWinner(winner);
  };


  const startBattle = async () => {
    setIsBattling(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    executeBattle();
  };


  const resetBattle = () => {
    setIsBattling(false)
    setBattleLog([])
    setWinner(null)
    startBattle()
  }

  const clearArena = () => {
    setMonster([])
    setWinner(null)
    setIsBattling(false)
    setBattleLog([])
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent mb-2">
            Monster Battle Arena
          </h1>
          <p className="text-slate-300 text-lg">Crie seus monstros e prepare-se para a batalha épica!</p>
        </header>


        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Sword className="w-6 h-6 text-purple-400" />
                  Arena de Batalha
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-purple-400 text-center">JOGADOR 1</h4>
                    <MonsterSlot monster={monster[0]} position="left" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-green-400 text-center">JOGADOR 2</h4>
                    <MonsterSlot monster={monster[1]} position="right" />
                  </div>
                </div>

                {
                  monster.length >= 2 && !winner && (
                    <div className="mt-6 text-center">
                      <Button
                        onClick={startBattle}
                        disabled={isBattling}
                        size='lg'
                        className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white font-bold px-8 py-3 text-lg">
                        {isBattling ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            BATALHA EM ANDAMENTO...
                          </>
                        ) : (
                          "⚔️ INICIAR BATALHA"
                        )}
                      </Button>
                    </div>
                  )
                }

                {
                  winner && (
                    <div className=" mt-6 text-center p-6 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl border border-yellow-500/30">
                      <h3 className="text-2xl font-bold text-yellow-400 mb-2">🏆 VENCEDOR</h3>
                      <p className="text-xl text-green-400 font-bold">{winner.name}</p>
                      <p className="text-sm text-slate-300 mt-1">
                        Batalha finalizada em {Math.max(...battleLog.map(entry => entry.round))} round
                        {Math.max(...battleLog.map(entry => entry.round)) !== 1 ? "s" : ""}
                      </p>
                    </div>
                  )
                }

                {battleLog.length > 0 && <BattleLogArea battleLog={battleLog} />}

                {
                  winner && (
                    <div className="flex justify-center gap-2 mt-4">
                      <Button variant="secondary" onClick={resetBattle}>Nova Batalha</Button>
                      <Button variant="destructive" onClick={clearArena}>Limpar arena</Button>
                    </div>
                  )
                }

              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Plus className="w-6 h-6 text-purple-400" />
                  Arena de Batalha
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RegisterForm onRegister={handleRegister} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;