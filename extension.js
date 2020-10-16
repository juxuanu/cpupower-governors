/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const GETTEXT_DOMAIN = 'cpupower-governor';

const { GObject, St } = imports.gi;

const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Util = imports.misc.util; // Needed for Util.spawn
const GLib = imports.gi.GLib;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const Gio = imports.gi.Gio;

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('CPU Governor'));

        let box = new St.BoxLayout({ style_class: 'panel-status-menu-box' });

        let icon = new St.Icon({
            style_class: 'system-status-icon',
            icon_name: 'main-icon',
        });
        icon.gicon = Gio.icon_new_for_string(`${Me.path}/icons/main.svg`);
        box.add_child(icon);

        box.add_child(PopupMenu.arrowIcon(St.Side.BOTTOM));
        this.add_child(box);

        let item = new PopupMenu.PopupMenuItem(_('Powersave'));
        item.connect('activate', () => {
            Util.spawn(['/bin/bash', '-c', "pkexec cpupower frequency-set -g powersave"]);
        });
        this.menu.addMenuItem(item);

        let item2 = new PopupMenu.PopupMenuItem(_("Conservative"));
        item2.connect('activate', () => {
            Util.spawn(['/bin/bash', '-c', "pkexec cpupower frequency-set -g conservative"]);
        });
        this.menu.addMenuItem(item2);

        let item3 = new PopupMenu.PopupMenuItem(_("OnDemand"));
        item3.connect('activate', () => {
            Util.spawn(['/bin/bash', '-c', "pkexec cpupower frequency-set -g ondemand"]);
        });
        this.menu.addMenuItem(item3);

        let item4 = new PopupMenu.PopupMenuItem(_("Performance"));
        item4.connect('activate', () => {
            Util.spawn(['/bin/bash', '-c', "pkexec cpupower frequency-set -g performance"])
        });
        this.menu.addMenuItem(item4);
        
        let item5 = new PopupMenu.PopupMenuItem(_("Schedutil"));
        item5.connect('activate', () => {
            Util.spawn(['/bin/bash', '-c', "pkexec cpupower frequency-set -g schedutil"])
        });
        this.menu.addMenuItem(item5);
    }
});

class Extension {
    constructor(uuid) {
        this._uuid = uuid;

        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
