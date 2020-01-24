import "mocha";

import { Agent } from "../dist/Agent";

const NB_AGENTS = 500;
const NB_TRADES = 25000000;

describe("Testing model-egalite", function() {
  this.timeout(50000);
  it("custom test", function() {
    const agentA = new Agent();
    const agentB = new Agent();

    for (let n = 0; n < 500; n++) {
      Agent.trade(agentA, agentB);
    }
    console.log(agentA, agentB);
  });

  it("custom array test", function() {
    const agents: Array<Agent> = [];
    for (let n = 0; n < NB_AGENTS; n++) {
      agents.push(new Agent());
    }

    for (let n = 0; n < NB_TRADES; n++) {
      Agent.randomTrade(agents);
    }
    Agent.sortArray(agents);
    Agent.print(agents);
  });
});
