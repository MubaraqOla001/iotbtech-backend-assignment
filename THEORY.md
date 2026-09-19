1. The exact output of both lines respectively are
First line gave this: [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Projects\\BackendLearning\\iotbtech-backend-assignment\\mini-project\\app.js',
  '--port',
  '8080',
  '--host',
  'localhost'
]
Second line gave this: [ '--port', '8080', '--host', 'localhost' ]

The output of both lines are different because in the second line, an array method was used which is slice to remove the first two items in the array.
argv is arguement vector that allow node to turn every word typed in the terminal to array of strings so that node can read them.
index 0 represent the path to the node on the local system.
index 1 reperesent the path to the file which is app.js in the local system
index 2+ represent every other words typed in the terminal.

2. Like explained earlier the index 0 and index 1 represent file paths which constantly changes, so when someother persons run that same script on a different computer environment the person will have an entirely different path, so it is good to always remove the two items so as to focus on the clean lists input.

3. 10
   5
   5
   The first two numbers are different from each other because the first number represents the english character bytes why the second number represent non english arabic characters bytes. and for english characters UTF-8 assign 1 byte to one character and to non english arabic character it assign 2 bytes to one character.
   The first number different from the third one even though both are the same arabic character because Buffer.from() measured the characters in bytes while the third one only count the numbers of characters present in the words.

4. using readFileSync a function of fs will crash the machine because the function takes up the entire contents of the file we are trying to read from the hard drive or ssd which is 5gb and loads it directly to the RAM allocated to node process all at once but then because of how javascript read text internally the standard utf-8 which allocates 8 bits equivalent of 1 byte to english character javascript uses utf-16 instead which allocates 2 bytes to each character so the 5gb will not stay 5gb but expanded to 10gb which is more than the 8gb RAM available the node panick and throw an error that the heap memory cannot withstand the space the node crash instantly before it even finish reading the file. and the system 8gb ram is overwhelmed so the system crash.
using createReadStream function reads the file slowly instead of loading the entire 5gb into the the RAM instantly.

5. pipe() has no error cleanup: if destination fails mid-copy, source isn't destroyed (file descriptors leak). pipeline() destroys the streams on error and propagates to an awaitable promise.

6. 4e6f64652e6a73 and Tm9kZS5qcw==.

7. "Flat" = constant memory regardless of input size: bucket grows linearly (O(file size)); pipe processes one chunk at a time so memory stays at chunk size (flat).

8. Bun: runs .ts directly (no build step), super fast installs (bun install binary lockfile), built-in bundler + test runner. Judgement question — any justified answer. Node remains default for enterprise ecosystem maturity.

9. GET /api/products/featured → { hit: "featured" } (registered before /:id; order wins). GET /api/products/42 → { hit: "by-id", id: "42" }. GET /api/products → { hit: "fallback" } via the mounted router app.use (router GET / not defined here, so app.use("/api/products", ...) fallback catches it — actually with the given app.use("/api/products", (req,res)=>...) the router's GET "/" would ALSO exist as a route inside a real setup; the teaching point is order + first-match-wins). Note: in the literal snippet there is no productRouter — the app.use("/api/products", handler) acts as fallback for /api/products after / matches nothing. Any answer showing awareness that specific routes must precede catches and that first match wins is correct.

10. req.params.id is string. Convert with Number(req.params.id). Express leaves URL segments as text because path segments are always textual on the wire.

11. Routes = map URL→controller; controller = transport (parse req, call service, respond); service = data + business rules. Storage change → product.service.ts only (data lives in service layer).

12. Missing app.use(express.json()). Must be before routes. Without it no middleware parses the body; req.body stays undefined.

13. Mount prefix /api/products: router.get("/") → GET /api/products; router.get("/:id") → GET /api/products/:id; router.get("/top") → GET /api/products/top.

14. (a) 201 Created — resource created; (b) 404 Not Found; (c) 400 Bad Request — malformed/incomplete input; (d) 500 Internal Server Error; (e) 200 OK.

15. Exact order:

M1 in
M2 GET /
handler starts
handler ends
M1 out

M1 out runs AFTER the handler because next() resumes after the downstream chain completes; the code after next() runs when control unwinds back. 16. Client sees an endless spinner/hang; terminal shows the earlier logs then silence. Express can't guess intent — middleware ending a request (auth reject) must be allowed, so it never auto-calls next(). 17. Express inspects the function's declared param count (fn.length): 4 → error handler middleware; fewer → normal. Trimming to 3 silently demotes it to normal middleware and it stops catching errors. 18. (a) next() continues to the next regular middleware. (b) next(err) skips all remaining regular middleware and jumps to the first 4-param error handler. Error path skips e.g. express.json down-stream routes. 19. The middleware attaches a "finish" event listener to res and calls next(). The listener fires later, when the response has actually been sent (event loop). So the log line is written after res.send() completes — end-to-end duration. 20. Express 4: the async rejection is unhandled — Express doesn't auto-forward, often logged as unhandled rejection. Express 5: auto-catches and forwards to error handler. Express 4 fixes: wrap in try/catch + next(err), or wrap with asyncHandler. Check npm ls express. 21. 404 = matched nothing (a route/fallback case, not an error), 500 = handler crashed. 404 handler before error handler so "no route" cases are answered as 404 before any real error can be mislabeled 500. Swapped: unknown paths would hit the error handler first and (with no error) fall through to... the 404 last is fine, but the convention and correct ordering is 404 first then 500 handler; if the error handler is placed before the 404 handler it still functions if written correctly, but the golden-pipeline order (routes → 404 → error) is the normalized, canonical one — and a naive swap places error handler before 404 so unknown routes return the error handler's fallback (500) incorrectly.