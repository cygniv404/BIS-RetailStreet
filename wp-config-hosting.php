<?php


/*******************************************************************************************/
/*******************************************************************************************/
/*                                                                                         */
/*               DO NOT CHANGE THIS FILE, YOUR CHANGES WILL NOT BE SAVED                   */
/*                                                                                         */
/*******************************************************************************************/
/*******************************************************************************************/


/**
 *      =======================   MANAGED HOSTING WP-CONFIG FILE   =======================
 *
 *          This file has configurations that are managed automatically by your
 *              hosting account, any changes you make to this file WILL NOT BE SAVED.
 *
 *          If you feel you need to make changes to the seetings in this file please
 *              contact an agent in the support department.
 *
 *          @package Pagely v4.0.1
 *      ==================================================================================
 */



/** Wordpress Cacheing Setting **/
if ( !defined('WP_CACHE') )
	define('WP_CACHE', true);

define('DISABLE_WP_CRON', true);

/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
/** The name of the database for WordPress */
define('DB_NAME',     'wp_artnight_staging');

/** MySQL database username */
define('DB_USER',     'root');

/** MySQL database password */
define('DB_PASSWORD', 'HR^thV4qT8A^!b2sw');

/** MySQL hostname */
define('DB_HOST', '192.168.0.148:8635');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/** Define method for plugin/theme upload or update **/
if ( !defined('FS_METHOD') )
	define('FS_METHOD','direct');



/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */

if ( !defined('AUTH_KEY') )
	define('AUTH_KEY',         'An@a!324!iXQqcv8WmOX[KFfeX!ptYY20cIq?MBH');

if ( !defined('SECURE_AUTH_KEY') )
	define('SECURE_AUTH_KEY',  'O0OYjaF@Pur[KL7]lbIdh!$0UUH8rjXrJbVR1WyO');

if ( !defined('LOGGED_IN_KEY') )
	define('LOGGED_IN_KEY',    'ky$?8IOXpKvrtP?Fi@KZqy?0?!9yv1pNAbGUO4LP');

if ( !defined('NONCE_KEY') )
	define('NONCE_KEY',        'nWyhXI7?e8!MBu2xNvrevGicJx8[TlnNrkm5]i9k');

if ( !defined('AUTH_SALT') )
	define('AUTH_SALT',        'RWHDJSdAxSlI?DOWsItWTrZi6g32Gb0No2CzTy0s');

if ( !defined('SECURE_AUTH_SALT') )
	define('SECURE_AUTH_SALT', '$dUaJ$mH7LomLaq#rIESW?CeshQ73!B7#5Co71j2');

if ( !defined('LOGGED_IN_SALT') )
	define('LOGGED_IN_SALT',   'k]mNNy53xl4R[M3kPMruAgEG]pr#ugwk4Nk$wbia');

if ( !defined('NONCE_SALT') )
	define('NONCE_SALT',       'QB!]hktfk#R?R3edyOeRPKcQ]nMVN4H!@[bSVSdI');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
if ( !defined('WPLANG') )
   define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
if ( !defined('WP_DEBUG') )
    define('WP_DEBUG', false);


/** Turn off Post revisions to keep DB size down **/
if ( !defined('WP_POST_REVISIONS') )
	define('WP_POST_REVISIONS', false);



    /** Maske sure multisite is off **/
    if ( defined('MULTISITE') AND MULTISITE ){
        die('You do not have a multisite enabled account, please contact support.');
    }



/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

