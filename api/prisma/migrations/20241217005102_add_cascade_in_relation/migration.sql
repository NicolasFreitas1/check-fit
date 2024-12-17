-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_id_gym_fkey";

-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_id_user_fkey";

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_id_gym_fkey" FOREIGN KEY ("id_gym") REFERENCES "gyms"("id_gym") ON DELETE CASCADE ON UPDATE CASCADE;
