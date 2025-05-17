import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("synthetic", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("gender").notNullable();
    table.integer("age").notNullable();
    table.string("weight").notNullable();
    table.string("height").notNullable();
    table.string("lila").notNullable();
    table.string("status").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("synthetic");
}
