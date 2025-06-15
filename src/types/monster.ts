export interface MonsterBattle {
    name: string;
    attack: number;
    defense: number;
    speed: number;
    hp: number;
    image_url: string;
}

export interface BattleLog {
    round: number;
    attacker: string;
    defender: string;
    damage: number;
    defenderHpAfter: number;
}