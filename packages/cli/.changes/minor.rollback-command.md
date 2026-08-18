Added `remix db rollback`, which reverts applied migrations newest first by running their `down.sql`. It reverts `--step <n>` migrations (default `1`), or every migration back through `--to <migration>`, including the named one; the two options cannot be combined. Rolling back previously required calling `Database.migrate()` with `direction: "down"` from application code, because `remix db migrate --to` only bounds forward progress.

```sh
remix db rollback
remix db rollback --step 2
remix db rollback --to 20260301113000_add_user_status
```

`remix db migrate` and `remix db rollback` also accept `--dry-run`, which prints the migrations a run would apply or revert (`would apply …` / `would revert …`) and leaves the database and the migration journal untouched.
