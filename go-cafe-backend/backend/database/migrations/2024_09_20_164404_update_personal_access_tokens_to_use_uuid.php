<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            // Drop the existing tokenable_id and tokenable_type columns
            $table->dropMorphs('tokenable');

            // Add the new columns with the correct types
            $table->uuid('tokenable_id');
            $table->string('tokenable_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('personal_access_tokens', function (Blueprint $table) {
            // Drop the new columns
            $table->dropColumn(['tokenable_id', 'tokenable_type']);

            // Re-add the old morphs (with integer type for tokenable_id)
            $table->morphs('tokenable');
        });
    }
};
