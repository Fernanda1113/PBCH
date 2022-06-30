export default class BaseRepository {
    constructor(Entity, dao, DTO) {
      this.Entity = Entity;
      this.dao = dao;
      this.DTO = DTO;
    }
  
    async getAll() {
      const dtos = await this.dao.getAll();
      return dtos.map(dto => new this.Entity(dto));
    }
  
    async getById(id) {
      const dto = await this.dao.getById(id);
      return dto ? new this.Entity(dto) : dto;
    }
  
    async save(entity) {
      let dto = new this.DTO(entity);
      dto = await this.dao.save(dto);
      return new this.Entity(dto);
    }
  
    async updateById(id, data) {
      let dto = new this.DTO(data);
      dto = await this.dao.updateById(id, dto);
      return dto ? new this.Entity(dto) : dto;
    }
  
    async deleteAll() {
      return this.dao.deleteAll();
    }
  
    async deleteById(id) {
      const dto = await this.dao.deleteById(id);
      return dto;
    }
  }