<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit1fcfe37da3adf179f00e62aa8112bff5
{
    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Nelio_Unlocker_Admin' => __DIR__ . '/../..' . '/admin/class-nelio-unlocker-admin.php',
        'Nelio_Unlocker_External_Page_Wrapper' => __DIR__ . '/../..' . '/public/class-nelio-unlocker-external-page-wrapper.php',
        'Nelio_Unlocker_Importer_Page' => __DIR__ . '/../..' . '/admin/pages/class-nelio-content-importer-page.php',
        'Nelio_Unlocker_Public' => __DIR__ . '/../..' . '/public/class-nelio-unlocker-public.php',
        'Nelio_Unlocker_REST_API' => __DIR__ . '/../..' . '/includes/class-nelio-unlocker-rest-api.php',
        'Nelio_Unlocker_Virtual_Dom_Exporter' => __DIR__ . '/../..' . '/public/class-nelio-unlocker-virtual-dom-exporter.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit1fcfe37da3adf179f00e62aa8112bff5::$classMap;

        }, null, ClassLoader::class);
    }
}
