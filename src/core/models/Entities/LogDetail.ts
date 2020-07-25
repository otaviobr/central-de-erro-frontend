export default class LodDetail {
    public box = '';
    public created_at = '';
    public description = '';
    public frequency = 0;
    public id = 0;
    public level = '';
    public origin = '';
    public resumo = '';

    // eslint-disable-next-line
    constructor(item: any) {
        this.box = item ? item.box : '';
        // eslint-disable-next-line
        this.created_at = item ? item.created_at : '';
        this.description = item ? item.description : '';
        this.frequency = item ? item.frequency : 0;
        this.id = item ? item.id : 0;
        this.level = item ? item.level : '';
        this.origin = item ? item.origin : '';
    }
}