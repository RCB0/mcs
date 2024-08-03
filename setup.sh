#!/usr/bin/expect

set timeout -1

spawn ./start.sh
expect "Language (eng):"
send -- "eng\r"
expect "Do you accept the License? (y/N):"
send -- "y\r"
expect "Do you want to skip the set-up wizard? (y/N):"
send -- "n\r"
expect "Give a name to your server (PocketMine-MP Server):"
send -- "rcb0\r"
expect "Server port (IPv4) (19132):"
send -- "19132\r"
expect "Server port (IPv6) (19133):"
send -- "19133\r"
expect "Default Game mode (0):"
send -- "0\r"
expect "Max. online players (20):"
send -- "20\r"
expect "Maximum view distance (chunks) (16):"
send -- "50\r"
expect "OP player name (example, your game name):"
send -- "REYN7554\r"
expect "Do you want to enable the white-list? (y/N):"
send -- "\r"
expect "Do you want to disable Query? (y/N):"
send -- "n\r"
expect "You may have to port-forward to your internal IP"
send -- "\r"
expect eof
