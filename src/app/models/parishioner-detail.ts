import {AdditionalInfo} from "./additional-info";
import {Parishioner} from "./parishioner";
import {Membership} from "./membership";
import {Meeting} from "./meeting";

export interface ParishionerDetail{
  additionalInfos: AdditionalInfo[],
  parishionerBaseInfo: Parishioner,
  memberships: Membership[],
  partecipations: Meeting[]
}
