import { EntityRepository, Repository } from 'typeorm';
import Done from '../models/Done';

interface IYears {
  year: number;
}

@EntityRepository(Done)
class DoneRepository extends Repository<Done> {
  public async getYears(): Promise<IYears> {
    const yearsWithSale = await this.query(`
      select distinct(extract(year from exit_date)) as year
      from done
      order by extract(year from exit_date) desc
    `);

    return yearsWithSale;
  }
}

export default DoneRepository;
