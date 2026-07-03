import re

file_path = "C:/Users/LENOVO/Desktop/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update calculateReviewCost function
old_func = """            window.calculateReviewCost = function () {
                const visitors = parseFloat(document.getElementById('rc-visitors').value) || 0;
                const days = parseFloat(document.getElementById('rc-days').value) || 30;
                const pricePerReviewDH = parseFloat(document.getElementById('rc-price').value) || 0;

                // Reviews calculation
                const monthlyReviews = visitors * days;
                const annualReviews = monthlyReviews * 12;

                // Cost of buying reviews (in DH)
                const monthlyCostDH = monthlyReviews * pricePerReviewDH;
                const annualCostDH = annualReviews * pricePerReviewDH;

                // Erupify subscription cost (Business plan = $99/mo = ~990 DH/mo)
                const erupifyMonthlyDH = 990;
                const erupifyAnnualDH = erupifyMonthlyDH * 12;

                // Savings
                const monthlySavingDH = Math.max(0, monthlyCostDH - erupifyMonthlyDH);
                const annualSavingDH = Math.max(0, annualCostDH - erupifyAnnualDH);

                // ROI
                const roi = erupifyAnnualDH > 0 ? Math.round((annualSavingDH / erupifyAnnualDH) * 100) : 0;

                // Display results (always in DH for this tool)
                document.getElementById('rc-monthly-reviews').textContent = monthlyReviews.toLocaleString();
                document.getElementById('rc-annual-reviews').textContent = annualReviews.toLocaleString();
                document.getElementById('rc-monthly-cost').textContent = `DH ${monthlyCostDH.toLocaleString()}`;
                document.getElementById('rc-annual-cost').textContent = `DH ${annualCostDH.toLocaleString()}`;
                document.getElementById('rc-monthly-saving').textContent = `DH ${monthlySavingDH.toLocaleString()}`;
                document.getElementById('rc-annual-saving').textContent = `DH ${annualSavingDH.toLocaleString()}`;
                document.getElementById('rc-roi').textContent = `${roi}%`;
            };"""

new_func = """            window.calculateReviewCost = function () {
                const visitors = parseFloat(document.getElementById('rc-visitors').value) || 0;
                const days = parseFloat(document.getElementById('rc-days').value) || 30;
                const pricePerReviewInput = parseFloat(document.getElementById('rc-price').value) || 0;

                // Convert input price from selected currency to USD
                const pricePerReviewUsd = pricePerReviewInput / CURRENCY_RATES[currentCurrency];

                // Reviews calculation
                const monthlyReviews = visitors * days;
                const annualReviews = monthlyReviews * 12;

                // Cost of buying reviews (in USD)
                const monthlyCostUsd = monthlyReviews * pricePerReviewUsd;
                const annualCostUsd = annualReviews * pricePerReviewUsd;

                // Erupify subscription cost (Business plan = $99/mo)
                const erupifyMonthlyUsd = 99;
                const erupifyAnnualUsd = erupifyMonthlyUsd * 12;

                // Savings (in USD)
                const monthlySavingUsd = Math.max(0, monthlyCostUsd - erupifyMonthlyUsd);
                const annualSavingUsd = Math.max(0, annualCostUsd - erupifyAnnualUsd);

                // ROI
                const roi = erupifyAnnualUsd > 0 ? Math.round((annualSavingUsd / erupifyAnnualUsd) * 100) : 0;

                // Display results formatting to selected currency
                document.getElementById('rc-monthly-reviews').textContent = monthlyReviews.toLocaleString();
                document.getElementById('rc-annual-reviews').textContent = annualReviews.toLocaleString();
                document.getElementById('rc-monthly-cost').textContent = formatPrice(monthlyCostUsd);
                document.getElementById('rc-annual-cost').textContent = formatPrice(annualCostUsd);
                document.getElementById('rc-monthly-saving').textContent = formatPrice(monthlySavingUsd);
                document.getElementById('rc-annual-saving').textContent = formatPrice(annualSavingUsd);
                document.getElementById('rc-roi').textContent = `${roi}%`;
            };"""

if old_func in content:
    content = content.replace(old_func, new_func)
else:
    print("Warning: Could not find calculateReviewCost function")

# 2. Update Translations
replacements = {
    '"rc-lbl-price": "Price per Review (DH)",': '"rc-lbl-price": "Price per Review",',
    '"rc-lbl-price": "ثمن التقييم الواحد (درهم)",': '"rc-lbl-price": "ثمن التقييم الواحد",',
    '"rc-lbl-price": "Prix par Avis (DH)",': '"rc-lbl-price": "Prix par Avis",',
    '"rc-lbl-price": "Precio por Reseña (DH)",': '"rc-lbl-price": "Precio por Reseña",',
    '<label for="rc-price" data-i18n="rc-lbl-price">Price per Review (DH)</label>': '<label for="rc-price" data-i18n="rc-lbl-price">Price per Review</label>'
}

for k, v in replacements.items():
    if k in content:
        content = content.replace(k, v)
    else:
        print(f"Warning: Could not find translation {k}")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch applied for review cost calculator!")
