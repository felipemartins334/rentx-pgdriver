import { PostgresCategoriesRepository } from '@modules/cars/infra/postgres/repositories/PostgresCategoriesRepository'
import { PostgresSpecificationsRepository } from '@modules/cars/infra/postgres/repositories/PostgrespecificationsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { container } from 'tsyringe'

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  PostgresCategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  PostgresSpecificationsRepository
)