export default class Log{
    public id!: number;
    public origin!: string;
    public level!: string;
    public description!: string;
    public frequency!: string;
    public box!: string;

    /**
     *
     */
    constructor(id = 0, origin = '', level = '', description = '', frequency = '', box = '',) { 
        this.id = id;
        this.origin = origin;
        this.level = level;
        this.description = description;
        this.frequency = frequency;
        this.box = box;
    }
}