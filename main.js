const assert = require('assert');

//Calculate SoH by capacity
function calculateSoH(capacity) {
  return 100 * (capacity / 120);
}

//Classify battery health by SoH
function classifyBatteryBySoH(capacity) {
  const soh = calculateSoH(capacity);
  if (soh > 80) {
    return "healthy";
  } else if (soh >= 63) {
    return "exchange";
  } else {
    return "failed";
  }
}

//Count the number of batteries falling under each classification.
function countBatteriesByHealth(presentCapacities) {
  const counts = {
    healthy: 0,
    exchange: 0,
    failed: 0,
  };

  presentCapacities.forEach((capacity) => {
    const classification = classifyBatteryBySoH(capacity);
    counts[classification]++;
  });
  return counts;
}

function testBucketingByHealth() {
  console.log('Counting batteries by SoH...');
  const presentCapacities = [113, 116, 80, 95, 92, 70];
  const counts = countBatteriesByHealth(presentCapacities);
  assert(counts["healthy"] == 2);
  assert(counts["exchange"] == 3);
  assert(counts["failed"] == 1);
  console.log("Number of batteries according to SoH :", counts);

  //New test data 
  const newpresentCapacities = [108, 117, 80, 87, 95, 92, 60, 70, 107];
  const testcounts = countBatteriesByHealth(newpresentCapacities);
  assert(testcounts["healthy"] == 3);
  assert(testcounts["exchange"] == 4);
  assert(testcounts["failed"] == 2);
  
  console.log("Done counting :)");
}

testBucketingByHealth();
