export class RiskAssessment {

  private id: string;
  private riskDescription :string;
  private frequencyOfUse :string;
  private failureProbability :string;
  private failureImpactLevel :string;
  private failureImpactType :string;
  private failureProcedure :string;


  public constructor() {

  }

  public static fromMap(item: any): RiskAssessment {
    let ra = new RiskAssessment();
    ra.id = item.id;
    ra.riskDescription = item.riskDescription;
    ra.frequencyOfUse = item.frequencyOfUse;
    ra.failureProbability = item.failureProbability;
    ra.failureImpactLevel = item.failureImpactLevel;
    ra.failureImpactType = item.failureImpactType;
    ra.failureProcedure = item.failureProcedure;
    return ra;
  }

  public static toMap(ra: RiskAssessment): any {
    return {
      id: ra.id,
      riskDescription: ra.riskDescription,
      frequencyOfUse: ra.frequencyOfUse,
      failureProbability: ra.failureProbability,
      failureImpactLevel: ra.failureImpactLevel,
      failureImpactType: ra.failureImpactType,
      failureProcedure: ra.failureProcedure
    };
  }
}