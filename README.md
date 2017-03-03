# pi-barcode-scanner
A barcode scanner API running on a Raspberry PI

# Issues
* If scanner gets shutdown (or goes to sleep). App will crash.
* If a client terminates the connection, the app will get stuck in the 'Wooa. Chill man.' because its unable to reset the scanRequest

# One Time Token
[YYY-MM-DD HH:MM] + [DEVICE ID] + [SHARED SECRET]