`runRemixDb()` accepts a `rollback` command that reverts applied migrations newest first, bounded by `step` (default `1`) or by `to`, which is reverted as well. Passing both throws. It prints `reverted <id>_<name>` per migration, or `no migrations to revert` when nothing is applied.

```ts
await runRemixDb({ command: 'rollback', db, migrations, step: 2 })
await runRemixDb({ command: 'rollback', db, migrations, to: '20260301113000_add_user_status' })
```

`migrate` and `rollback` also accept `dryRun`, which reports the migrations a run would apply or revert as `would apply <id>_<name>` and `would revert <id>_<name>` without executing them.
