import {AdditionalInfo} from "./additional-info";
import {Parishioner} from "./parishioner";

export interface ParishionerDetail{
  additionalInfos: AdditionalInfo[],
  parishionerBaseInfo: Parishioner
}
