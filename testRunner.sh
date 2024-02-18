for i in $(seq 1 100); do
  echo "Iteration $i"
  testcafe "lambdatest:Galaxy S22 5G@13:android" "test.js"
done
