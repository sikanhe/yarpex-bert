# YARPEX BERT

BERT backend for YARPEX

Run `yarn dev` to start.

## Usage

|yarpex |erlang/elixir term   |
|---|---|
|`yarpex.atom("key")`   |`:key`   |
|`yarpex.keywordlist({key: "value"})`   |`[key: "value"]`   |
|`yarpex.map([[yarpex.atom("key"), "value"], [yarpex.atom("yarpex"), true] ])`|`%{key: "value", yarpex: true}`   |
| `yarpex.struct('StructType')({key: "value"})`  | `%StructType{key: "value"}`  |
