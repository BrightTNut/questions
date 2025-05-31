// function parseTeaQuestion(question) {
//   const priceRegex = /₹(\d+)/g;
//   const percentRegex = /(\d+)%/g;

//   const prices = [...question.matchAll(priceRegex)].map((p) => +p[1]);
//   const profitMatch = question.match(percentRegex);
//   const profit = profitMatch ? parseFloat(profitMatch[0]) : null;

//   if (
//     question.includes("in what ratio") &&
//     prices.length >= 2 &&
//     profit !== null
//   ) {
//     const sellingPriceMatch = question.match(/₹(\d+(\.\d+)?)/g);
//     const sp = sellingPriceMatch
//       ? parseFloat(
//           sellingPriceMatch[sellingPriceMatch.length - 1].replace("₹", "")
//         )
//       : null;

//     if (!sp) return "⚠️ Could not detect selling price.";

//     const cp = sp / (1 + profit / 100);
//     const [cheap, costlier] = prices;

//     const diff1 = costlier - cp;
//     const diff2 = cp - cheap;

//     return `💡 Solving Ratio Problem:
// Selling Price = ₹${sp}
// Profit = ${profit}% ➝ Cost Price = ₹${cp.toFixed(2)}

// Let cheaper tea = ₹${cheap}, costlier = ₹${costlier}
// Using alligation:
// Ratio = (Costlier - Mean) : (Mean - Cheaper)
// → (${costlier} - ${cp.toFixed(2)}) : (${cp.toFixed(2)} - ${cheap})
// → ${diff1.toFixed(2)} : ${diff2.toFixed(2)}

// ✅ Required Ratio = ${diff1.toFixed(2)} : ${diff2.toFixed(2)}
// `;
//   }

//   return "⚠️ Unsupported question. Only ratio-based tea mix problems are currently handled.";
// }

// function solveTeaProblem() {
//   const question = document.getElementById("questionInput").value.trim();
//   const output = parseTeaQuestion(question);
//   document.getElementById("outputArea").innerText = output;
// }
function parseTeaQuestion(question) {
  const priceRegex = /₹(\d+(\.\d+)?)/g;
  const percentRegex = /(\d+(\.\d+)?)%/g;
  const ratioRegex = /(\d+):(\d+)/;

  const prices = [...question.matchAll(priceRegex)].map((p) =>
    parseFloat(p[1])
  );
  const profitMatch = question.match(percentRegex);
  const profit = profitMatch ? parseFloat(profitMatch[0]) : null;

  const ratioMatch = question.match(ratioRegex);
  const ratioA = ratioMatch ? parseFloat(ratioMatch[1]) : null;
  const ratioB = ratioMatch ? parseFloat(ratioMatch[2]) : null;

  // === Q1: In what ratio should he mix...
  if (
    question.toLowerCase().includes("in what ratio") &&
    prices.length >= 3 &&
    profit !== null
  ) {
    const [price1, price2, sellingPrice] = prices;
    const costPrice = sellingPrice / (1 + profit / 100);
    const diff1 = price2 - costPrice;
    const diff2 = costPrice - price1;

    return `🧮 Tea Ratio Problem (Q1):
Selling Price = ₹${sellingPrice}
Profit = ${profit}% → Cost Price = ₹${costPrice.toFixed(2)}

Using Alligation Method:
Ratio = (Costlier - Mean) : (Mean - Cheaper)
→ (${price2} - ${costPrice.toFixed(2)}) : (${costPrice.toFixed(2)} - ${price1})
→ ${diff1.toFixed(2)} : ${diff2.toFixed(2)}

✅ Required Ratio = ${diff1.toFixed(2)} : ${diff2.toFixed(2)}`;
  }

  // === Q2: At what selling price per kg should he sell...
  if (
    question.toLowerCase().includes("what selling price") &&
    ratioA !== null &&
    ratioB !== null &&
    prices.length >= 2 &&
    profit !== null
  ) {
    const [cost1, cost2] = prices;
    const totalRatio = ratioA + ratioB;
    const costPrice = (cost1 * ratioA + cost2 * ratioB) / totalRatio;
    const sellingPrice = costPrice * (1 + profit / 100);

    return `🧮 Selling Price Problem (Q2):
Type 1 Cost = ₹${cost1}, Type 2 Cost = ₹${cost2}
Ratio = ${ratioA}:${ratioB}
Average Cost Price = ₹${costPrice.toFixed(2)}
Profit = ${profit}% ➝ Selling Price = ₹${sellingPrice.toFixed(2)}

✅ Required Selling Price = ₹${sellingPrice.toFixed(2)} per kg`;
  }

  // === Q3: What is cost price of mixture
  if (
    question.toLowerCase().includes("cost price") &&
    prices.length >= 1 &&
    profit !== null
  ) {
    const sellingPrice = prices[0];
    const costPrice = sellingPrice / (1 + profit / 100);

    return `🧮 Cost Price Problem (Q3):
Selling Price = ₹${sellingPrice}
Profit = ${profit}% ➝ Cost Price = ₹${costPrice.toFixed(2)}

✅ Required Cost Price = ₹${costPrice.toFixed(2)} per kg`;
  }

  return "⚠️ Unsupported question. Try rephrasing or use one of the supported formats (Q1–Q3).";
}

function solveTeaProblem() {
  const question = document.getElementById("questionInput").value.trim();
  const output = parseTeaQuestion(question);
  document.getElementById("outputArea").innerText = output;
}
