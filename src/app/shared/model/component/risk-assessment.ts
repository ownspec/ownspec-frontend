export class RiskAssessment {

  private id: string;
  private frequencyOfUse: string;
  private failureImpactLevel: string;
  private acceptableFailureRate: number;

  public constructor() {

  }

  public static fromMap(item: any): RiskAssessment {
    let ra = new RiskAssessment();
    ra.id = item.id;
    ra.frequencyOfUse = item.frequencyOfUse;
    ra.failureImpactLevel = item.failureImpactLevel;
    ra.acceptableFailureRate = item.acceptableFailureRate;
    return ra;
  }

  public static toMap(ra: RiskAssessment): any {
    return {
      id: ra.id,
      frequencyOfUse: ra.frequencyOfUse,
      failureImpactLevel: ra.failureImpactLevel,
      acceptableFailureRate: ra.acceptableFailureRate,
    };
  }
}