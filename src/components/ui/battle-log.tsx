
interface BattleLog {
    round: number;
    attacker: string;
    defender: string;
    damage: number;
    defenderHpAfter: number;
}


interface BattleLogProps {
    battleLog: BattleLog[]
}

const BattleLogArea = ({ battleLog }: BattleLogProps) => {
    return (
        <div className="bg-slate-800 p-4 rounded-lg text-white mt-4">
            <h3 className="text-lg font-bold mb-3">📜 Registro da Batalha</h3>

            <ul className="space-y-2 max-h-60 overflow-y-auto scroll-smooth">
                {Object.entries(
                    battleLog.reduce((acc, log) => {
                        if (!acc[log.round]) acc[log.round] = [];
                        acc[log.round].push(log);
                        return acc;
                    }, {} as Record<number, BattleLog[]>)
                ).map(([round, entries]) => (
                    <li key={round} className="bg-slate-700 p-3 rounded shadow-sm">
                        <div className="text-sm text-slate-400 mb-2">🌀 Round {round}</div>

                        {entries.map((entry, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <span className="font-bold text-yellow-300">{entry.attacker}</span>
                                <span>causou</span>
                                <span className="text-red-400 font-bold">{entry.damage} de dano</span>
                                <span>em</span>
                                <span className="font-bold text-blue-300">{entry.defender}</span>
                                <span>
                                    (HP restante:{" "}
                                    <span className="text-green-400">{entry.defenderHpAfter}</span>)
                                </span>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BattleLogArea;