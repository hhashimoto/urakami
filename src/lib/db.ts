import Dexie, { type Table } from "dexie";

export interface Paper {
    id?: number;
    body: string;
    archived: number; // booleanはdexieのインデックスに未対応のため、numberとする
}

export class MyDexie extends Dexie {
    papers!: Table<Paper>;

    constructor() {
        super('urakami_db');
        this.version(1).stores({
            papers: '++id, archived'
        });
    }
}

export const db = new MyDexie();
