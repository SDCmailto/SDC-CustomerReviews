//GET
rate = 1
Hannahs-MacBook-Pro:SDC-CustomerReviews hannahmanfredi$ k6 run k6script.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: k6script.js
     output: -

  scenarios: (100.00%) 1 scenario, 200 max VUs, 1m0s max duration (incl. graceful stop):
           * constant_request_rate: 1.00 iterations/s for 30s (maxVUs: 100-200, gracefulStop: 30s)


running (0m30.0s), 000/100 VUs, 30 complete and 0 interrupted iterations
constant_request_rate ✓ [==============================] 000/100 VUs  30s  1 iters/s

     data_received..................: 598 kB 20 kB/s
     data_sent......................: 2.8 kB 94 B/s
     http_req_blocked...............: avg=923.33µs min=248µs   med=299µs    max=12.65ms p(90)=654.2µs p(95)=3.4ms
     http_req_connecting............: avg=304.93µs min=199µs   med=238.5µs  max=1.51ms  p(90)=326.4µs p(95)=464.34µs
     http_req_duration..............: avg=1s       min=48.17ms med=240.85ms max=5.15s   p(90)=2.74s   p(95)=3.92s
       { expected_response:true }...: avg=1s       min=48.17ms med=240.85ms max=5.15s   p(90)=2.74s   p(95)=3.92s
     http_req_failed................: 0.00%  ✓ 0        ✗ 30
     http_req_receiving.............: avg=286.33µs min=101µs   med=172µs    max=2.6ms   p(90)=324.4µs p(95)=534.09µs
     http_req_sending...............: avg=414.46µs min=41µs    med=64.5µs   max=10.53ms p(90)=88.2µs  p(95)=97.14µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=1s       min=47.93ms med=239.37ms max=5.15s   p(90)=2.74s   p(95)=3.92s
     http_reqs......................: 30     0.999833/s
     iteration_duration.............: avg=1.01s    min=48.71ms med=241.55ms max=5.15s   p(90)=2.74s   p(95)=3.92s
     iterations.....................: 30     0.999833/s
     vus............................: 100    min=100    max=100
     vus_max........................: 100    min=100    max=100

rate = 10
Hannahs-MacBook-Pro:SDC-CustomerReviews hannahmanfredi$ k6 run k6script.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: k6script.js
     output: -

  scenarios: (100.00%) 1 scenario, 200 max VUs, 1m0s max duration (incl. graceful stop):
           * constant_request_rate: 10.00 iterations/s for 30s (maxVUs: 100-200, gracefulStop: 30s)


running (0m32.8s), 000/100 VUs, 301 complete and 0 interrupted iterations
constant_request_rate ✓ [===================================] 000/100 VUs  30s  10 iters/s

     data_received..................: 5.8 MB 177 kB/s
     data_sent......................: 28 kB  864 B/s
     http_req_blocked...............: avg=513.97µs min=239µs   med=383µs max=9.35ms p(90)=608µs p(95)=887µs
     http_req_connecting............: avg=410.1µs  min=184µs   med=285µs max=9.27ms p(90)=461µs p(95)=640µs
     http_req_duration..............: avg=2.09s    min=28.1ms  med=2.15s max=4.93s  p(90)=4.16s p(95)=4.53s
       { expected_response:true }...: avg=2.09s    min=28.1ms  med=2.15s max=4.93s  p(90)=4.16s p(95)=4.53s
     http_req_failed................: 0.00%  ✓ 0       ✗ 301
     http_req_receiving.............: avg=176.72µs min=68µs    med=143µs max=1.96ms p(90)=248µs p(95)=313µs
     http_req_sending...............: avg=105.81µs min=41µs    med=89µs  max=705µs  p(90)=159µs p(95)=196µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s    max=0s     p(90)=0s    p(95)=0s
     http_req_waiting...............: avg=2.09s    min=27.92ms med=2.15s max=4.93s  p(90)=4.16s p(95)=4.53s
     http_reqs......................: 301    9.18738/s
     iteration_duration.............: avg=2.09s    min=28.52ms med=2.15s max=4.94s  p(90)=4.16s p(95)=4.53s
     iterations.....................: 301    9.18738/s
     vus............................: 100    min=100   max=100
     vus_max........................: 100    min=100   max=100

rate = 100
Hannahs-MacBook-Pro:SDC-CustomerReviews hannahmanfredi$ k6 run k6script.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: k6script.js
     output: -

  scenarios: (100.00%) 1 scenario, 200 max VUs, 1m0s max duration (incl. graceful stop):
           * constant_request_rate: 100.00 iterations/s for 30s (maxVUs: 100-200, gracefulStop: 30s)

WARN[0003] Insufficient VUs, reached 200 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=constant_request_rate

running (0m37.4s), 000/200 VUs, 509 complete and 0 interrupted iterations
constant_request_rate ✓ [==================================] 000/200 VUs  30s  100 iters/s

     data_received..................: 9.8 MB 261 kB/s
     data_sent......................: 48 kB  1.3 kB/s
     dropped_iterations.............: 2492   66.71141/s
     http_req_blocked...............: avg=161.26µs min=3µs   med=7µs    max=5.4ms  p(90)=382.99µs p(95)=499.39µs
     http_req_connecting............: avg=124.49µs min=0s    med=0s     max=5.33ms p(90)=296.99µs p(95)=378.6µs
     http_req_duration..............: avg=12.8s    min=1.65s med=13.93s max=16.73s p(90)=16.27s   p(95)=16.54s
       { expected_response:true }...: avg=12.8s    min=1.65s med=13.93s max=16.73s p(90)=16.27s   p(95)=16.54s
     http_req_failed................: 0.00%  ✓ 0         ✗ 509
     http_req_receiving.............: avg=158.95µs min=64µs  med=139µs  max=1.31ms p(90)=229.2µs  p(95)=281.19µs
     http_req_sending...............: avg=51.31µs  min=15µs  med=37µs   max=1.82ms p(90)=85.2µs   p(95)=106.59µs
     http_req_tls_handshaking.......: avg=0s       min=0s    med=0s     max=0s     p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=12.8s    min=1.65s med=13.93s max=16.73s p(90)=16.27s   p(95)=16.54s
     http_reqs......................: 509    13.626047/s
     iteration_duration.............: avg=12.8s    min=1.65s med=13.93s max=16.73s p(90)=16.27s   p(95)=16.54s
     iterations.....................: 509    13.626047/s
     vus............................: 200    min=100     max=200
     vus_max........................: 200    min=100     max=200

rate = 1K
Hannahs-MacBook-Pro:SDC-CustomerReviews hannahmanfredi$ k6 run k6script.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: k6script.js
     output: -

  scenarios: (100.00%) 1 scenario, 200 max VUs, 1m0s max duration (incl. graceful stop):
           * constant_request_rate: 1000.00 iterations/s for 30s (maxVUs: 100-200, gracefulStop: 30s)

WARN[0000] Insufficient VUs, reached 200 active VUs and cannot initialize more  executor=constant-arrival-rate scenario=constant_request_rate

running (0m43.4s), 000/200 VUs, 556 complete and 0 interrupted iterations
constant_request_rate ✓ [=================================] 000/200 VUs  30s  1000 iters/s

     data_received..................: 11 MB 249 kB/s
     data_sent......................: 52 kB 1.2 kB/s
     dropped_iterations.............: 29444 678.05728/s
     http_req_blocked...............: avg=2.94ms   min=2µs      med=6µs    max=193.07ms p(90)=432µs   p(95)=997.25µs
     http_req_connecting............: avg=2.9ms    min=0s       med=0s     max=193.01ms p(90)=339.5µs p(95)=694.25µs
     http_req_duration..............: avg=13.21s   min=326.81ms med=13.77s max=19.46s   p(90)=15.43s  p(95)=15.53s
       { expected_response:true }...: avg=13.21s   min=326.81ms med=13.77s max=19.46s   p(90)=15.43s  p(95)=15.53s
     http_req_failed................: 0.00% ✓ 0         ✗ 556
     http_req_receiving.............: avg=140.52µs min=56µs     med=124µs  max=1.38ms   p(90)=216µs   p(95)=243.5µs
     http_req_sending...............: avg=53.45µs  min=13µs     med=30µs   max=869µs    p(90)=79.5µs  p(95)=116µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s     max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=13.21s   min=326.55ms med=13.77s max=19.46s   p(90)=15.43s  p(95)=15.53s
     http_reqs......................: 556   12.803962/s
     iteration_duration.............: avg=13.21s   min=328.12ms med=13.77s max=19.46s   p(90)=15.43s  p(95)=15.54s
     iterations.....................: 556   12.803962/s
     vus............................: 200   min=200     max=200
     vus_max........................: 200   min=200     max=200

//POST
