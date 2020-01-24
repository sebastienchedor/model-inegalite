const MEAN_WEALTH = 1000000; // 1 000 000

const share_coeff = 0;
const trade_bias = 0.1;
const debt = 0;

const stake_coeff = 0.01;

let shared_wealth = 0;

export class Agent {
  private wealth: number;
  constructor() {
    this.wealth = MEAN_WEALTH;
  }

  public static trade(agentA: Agent, agentB: Agent) {
    // stake
    const { poorest, richest } = Agent.sort(agentA, agentB);
    const stake = poorest.wealth * stake_coeff;

    // winner
    const rng = Math.random();
    const richest_diff = poorest.wealth / richest.wealth; // between 0 and 1
    const advantage_bias = (richest_diff * trade_bias) / 2;

    // transfert
    const result = Math.floor(rng > 0.5 + advantage_bias ? stake : -stake);
    poorest.wealth = poorest.wealth + result;
    richest.wealth = richest.wealth - result;

    // share
    richest.share();
    poorest.share();
  }

  private share() {
    const share_amount = Math.floor(
      (this.wealth - MEAN_WEALTH) * share_coeff * stake_coeff
    );
    shared_wealth += share_amount;
    this.wealth -= share_amount;
  }

  private static sort(
    agentA: Agent,
    agentB: Agent
  ): { poorest: Agent; richest: Agent } {
    if (agentA.wealth < agentB.wealth) {
      return {
        poorest: agentA,
        richest: agentB
      };
    } else {
      return {
        poorest: agentB,
        richest: agentA
      };
    }
  }

  public static randomTrade(agents: Array<Agent>) {
    const valA = Math.floor(Math.random() * agents.length);
    const valB = Math.floor(Math.random() * agents.length);
    Agent.trade(agents[valA], agents[valB]);
  }

  public static sortArray(agents: Array<Agent>) {
    return agents.sort((a, b) => {
      const { poorest, richest } = Agent.sort(a, b);
      if (poorest === a) {
        return 1;
      }
      return -1;
    });
  }

  public static print(agents: Array<Agent>) {
    const max = agents[0].wealth;
    const tick = max / 200;

    for (const agent of agents) {
      const size = Math.floor(agent.wealth / tick);
      const bar = "+".repeat(size);
      console.log(bar);
    }
    console.log(shared_wealth);
  }
}
