export class RiskAssessment {

  private id: string;
  private frequencyOfUse: string;
  private failureImpactLevel: string;
  private acceptableDefectRate: number;

  public constructor() {

  }

  public static fromMap(item: any): RiskAssessment {
    let ra = new RiskAssessment();
    ra.id = item.id;
    ra.frequencyOfUse = item.frequencyOfUse;
    ra.failureImpactLevel = item.failureImpactLevel;
    ra.acceptableDefectRate = item.acceptableDefectRate;
    return ra;
  }

  public static toMap(ra: RiskAssessment): any {
    return {
      id: ra.id,
      frequencyOfUse: ra.frequencyOfUse,
      failureImpactLevel: ra.failureImpactLevel,
      acceptableDefectRate: ra.acceptableDefectRate,
    };
  }
}