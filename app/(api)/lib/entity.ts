import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BusinessPlanInfo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text")
  title!: string;

  @Column("text")
  motivation!: string;

  @Column("text")
  development_state!: string;

  @Column("text")
  team_info!: string;

  @Column("text")
  goal_market!: string;

  @Column("datetime", { nullable: true })
  created_at!: Date;
}
