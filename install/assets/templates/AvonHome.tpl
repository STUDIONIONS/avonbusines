/**
 * AvonHome
 *
 * Шаблон Главной страницы сайта
 *
 * @category	template
 * @version 	1.0
 * @license 	http://www.gnu.org/copyleft/gpl.html GNU Public License (GPL)
 * @internal	@lock_template 0
 * @internal 	@modx_category Templates AVON BUSINES
 * @internal    @installset sample
 * @internal	@save_sql_id_as AVONHOME_SQL_ID
 */
<!DOCTYPE html>
<html lang="ru" prefix="og: http://ogp.me/ns#">
	{{head}}
	<body>
		<header>
			{{header_top}}
			{{main_menu}}
		</header>
		{{slider}}
		{{section_home_01}}
		{{section_home_02}}
		{{section_home_03}}
		{{section_home_04}}
		{{section_home_05}}
		{{footer}}
		<script src="assets/templates/ioweb/js/main.js" type="text/javascript"></script>
	</body>
</html>