import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTablesGenresAndOrders1696593337022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        'CREATE TABLE "genres ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" varchar, "description" varchar, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), PRIMARY KEY ("id"))'
      );

      await queryRunner.query(
        'CREATE TABLE "genres_X_games" ("genre_id" uuid NOT NULL uuid_generate_v4, "game_id" uuid NOT NULL, FOREIGN KEY ("genre_id") REFERENCES "genres" ("genre_id"), FOREIGN KEY ("game_id") REFERENCES "games" ("id"))'
      )

      await queryRunner.query(
        'CREATE TABLE "orders" ("id" uuid NOT NULL uuid_generate_v4, "user_flc" VARCHAR, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at TIMESTAMP NOT NULL DEFULT now(), PRIMARY KEY ("id"), FOREIGN KEY ("user_flc") REFERENCES "users" (id))'
      )

      await queryRunner.query(
        'CREATE TABLE "orders_X_games" ("order_id" uuid NOT NULL uuid_generate_v4, "game_id" uuid NOT NULL, FOREIGN KEY ("order_id") REFERENCES "orders" ("id"), FOREIGN KEY ("game_id") REFERENCES "games" ("id"))'
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "orders_x_games"')
      await queryRunner.query('DROP TABLE "orders"')
      await queryRunner.query('DROP TABLE "genres_x_games"')
      await queryRunner.query('DROP TABLE "genres"')
    }

}
