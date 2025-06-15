import type { MonsterBattle } from "@/types/monster";
import { Heart, Plus, Shield, Sword, Zap } from "lucide-react";

interface MonsterSlotProps {
    monster?: MonsterBattle,
    position: 'left' | 'right',
}


const MonsterSlot = ({ monster, position }: MonsterSlotProps) => {

    const isLeft = position === "left"
    return (
      <div
        className={`relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl border-2 border-slate-600 p-6 min-h-[350px] flex flex-col items-center justify-center transition-all duration-500 hover:scale-105 ${isLeft ? " hover:border-purple-400" : "hover:border-green-400"} hover:shadow-2xl ${isLeft ? "hover:shadow-purple-500/30" : "hover:shadow-green-500/30"} group overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent transform rotate-45 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
        </div>

        {monster ? (
          <>
            <div
              className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${isLeft ? "bg-purple-600" : "bg-green-600"} text-white shadow-lg`}
            >
              P{isLeft ? "1" : "2"}
            </div>

            <div
              className={`relative w-28 h-28 rounded-full overflow-hidden mb-4 border-4 shadow-lg ${isLeft ? "group-hover:border-purple-400" : "group-hover:border-green-400"}  transition-all duration-300`}
            >
             
              <img
                src={monster.image_url}
                alt={monster.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 rounded-full border-2 ${isLeft ? "border-purple-400/30" : "border-green-400/30"} animate-pulse`}
              ></div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-green-400 group-hover:bg-clip-text transition-all duration-300">
              {monster.name}
            </h3>

            <div className="w-full space-y-3">
              <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-2 border border-slate-600/50 hover:border-red-500/50 transition-colors duration-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-red-500/20 rounded">
                    <Sword className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300">ATK</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((monster.attack / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-red-400 min-w-[2rem] text-right">{monster.attack}</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-2 border border-slate-600/50 hover:border-blue-500/50 transition-colors duration-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-blue-500/20 rounded">
                    <Shield className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300">DEF</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((monster.defense / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-blue-400 min-w-[2rem] text-right">{monster.defense}</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-2 border border-slate-600/50 hover:border-yellow-500/50 transition-colors duration-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-yellow-500/20 rounded">
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300">SPD</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((monster.speed / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-yellow-400 min-w-[2rem] text-right">{monster.speed}</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-2 border border-slate-600/50 hover:border-green-500/50 transition-colors duration-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-500/20 rounded">
                    <Heart className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300">HP</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((monster.hp / 200) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-green-400 min-w-[2rem] text-right">{monster.hp}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="text-xs text-slate-400 mb-1">PODER TOTAL</div>
              <div
                className={`text-lg font-bold bg-gradient-to-r ${isLeft ? "from-purple-800" : "from-green-800"}  ${isLeft ? "to-red-300" : "to-green-300"}  bg-clip-text text-transparent`}
              >
                {monster.attack + monster.defense + monster.speed + monster.hp}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 mx-auto border-2 border-dashed border-slate-600 group-hover:border-slate-500 transition-all duration-300">
              <Plus className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p className="text-lg font-medium">Aguardando monstro...</p>
            <p className="text-sm text-slate-500 mt-1">Cadastre um monstro para começar</p>
          </div>
        )}

        <div
          className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2  rounded-tl-2xl`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2  rounded-br-2xl`}
        ></div>
      </div>
    )
}

export default MonsterSlot;