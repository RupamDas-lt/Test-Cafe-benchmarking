for i in {1..100}; do
  echo "Iteration $i"
  testcafe "lambdatest:iPhone 13@15.0:ios" "test.js"
done