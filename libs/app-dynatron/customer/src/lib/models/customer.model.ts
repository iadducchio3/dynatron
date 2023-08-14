import { EntityModel } from '@dynatron/core';

export interface CustomerModel extends EntityModel {
  FirstName: string;
  LastName: string;
  Email: string;
}
