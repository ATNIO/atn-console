# atn-console

Commandline console for ATN nodes.

`atnconsole` connects to a running ATN node via IPC/WS/HTTP
and provides an interactive javascript console containing the `web3` (1.x) object with admin extensions.

Note that the admin/debug additions are not yet official and may change over time.

Run `$ atnconsole --help` for help.

## Installation / Usage

    $ npm install -g atn-console
    ...

    $ atnconsole
    ATN CONSOLE
    Connecting to node at /Users/xyz/Library/Ethereum/geth.ipc
    ... Connection successful!

    Use the "web3" object to interact.
    You can find the documentation here: http://web3js.readthedocs.io/en/1.0/

    ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ
    Network: MAIN
    Current block: 5285047 [0x8a22bd], March 19th 2018, 20:46:37
    ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ

    > web3.admin.nodeInfo()
    ...


